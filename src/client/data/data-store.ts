import { MEMBERS, MIRROR_REFERENDUM_HELPER_DATA, VOTING_POLICY } from '../util/constants';
import {
    MirrorReferendum,
    MirrorReferendumQueryPage,
    MirrorReferendumVote,
    MirrorReferendumVoteQueryPage,
    Vote,
} from './types';

interface DataStoreDelegate {}

class DataStore {
    private delegate: DataStoreDelegate;

    constructor(delegate: DataStoreDelegate) {
        this.delegate = delegate;
    }

    async init() {}

    changeTrackParticipation(trackId: number, value: number) {
        const policy = VOTING_POLICY.get(trackId)!;
        policy.participation = value;
        VOTING_POLICY.set(trackId, policy);
    }

    changeTrackQuorum(trackId: number, value: number) {
        const policy = VOTING_POLICY.get(trackId)!;
        policy.quorum = value;
        VOTING_POLICY.set(trackId, policy);
    }

    changeTrackMajority(trackId: number, value: number) {
        const policy = VOTING_POLICY.get(trackId)!;
        policy.majority = value;
        VOTING_POLICY.set(trackId, policy);
    }

    async fetchMirrorReferenda(): Promise<MirrorReferendum[]> {
        const data: MirrorReferendumQueryPage = await (
            await fetch(
                'https://voting.opensquare.io/api/permanence/proposals' +
                    '?' +
                    new URLSearchParams({
                        page_size: '100',
                    }).toString(),
                {
                    method: 'GET',
                    headers: {},
                },
            )
        ).json();
        const mirrorReferendumList = data.items
            .filter((mirrorReferendum) => mirrorReferendum.status == 'active')
            .filter(
                (mirrorReferendum) =>
                    MIRROR_REFERENDUM_HELPER_DATA.get(mirrorReferendum._id) != undefined,
            );
        for (let i = 0; i < mirrorReferendumList.length; i++) {
            const mirrorReferendum = mirrorReferendumList[i];
            mirrorReferendum.votes = await this.fetchMirrorReferendumVotes(mirrorReferendum.cid);
            mirrorReferendum.helperData = MIRROR_REFERENDUM_HELPER_DATA.get(mirrorReferendum._id)!;
            const ayeCount = mirrorReferendum.votes.filter((vote) => vote.vote == Vote.Aye).length;
            const nayCount = mirrorReferendum.votes.filter((vote) => vote.vote == Vote.Nay).length;
            const abstainCount = mirrorReferendum.votes.filter(
                (vote) => vote.vote == Vote.Abstain,
            ).length;
            const participation = mirrorReferendum.votes.length / MEMBERS.size;
            const quorum = ayeCount / MEMBERS.size;
            const majority = ayeCount / mirrorReferendum.votes.length;
            const trackVotingPolicy = VOTING_POLICY.get(mirrorReferendum.helperData.track)!;
            let verdict = Vote.Nay;
            if (participation < trackVotingPolicy.participation) {
                verdict = Vote.Abstain;
            } else if (
                quorum >= trackVotingPolicy.quorum &&
                majority > trackVotingPolicy.majority
            ) {
                verdict = Vote.Aye;
            }
            mirrorReferendum.voteSummary = {
                ayeCount,
                nayCount,
                abstainCount,
                participation,
                quorum,
                majority,
                verdict,
            };
        }
        mirrorReferendumList.sort(
            (a: MirrorReferendum, b: MirrorReferendum) =>
                b.helperData.referendumId - a.helperData.referendumId,
        );
        return mirrorReferendumList;
    }

    async fetchMirrorReferendumVotes(referendumCID: string): Promise<MirrorReferendumVote[]> {
        const data: MirrorReferendumVoteQueryPage = await (
            await fetch(
                `https://voting.opensquare.io/api/permanence/proposal/${referendumCID}/votes` +
                    '?' +
                    new URLSearchParams({
                        page_size: '1000',
                    }).toString(),
                {
                    method: 'GET',
                    headers: {},
                },
            )
        ).json();
        for (let i = 0; i < data.items.length; i++) {
            const vote = data.items[i];
            if (vote.choices.filter((choice) => choice.trim().toLowerCase() == 'nay').length > 0) {
                vote.vote = Vote.Nay;
            } else if (
                vote.choices.filter((choice) => choice.trim().toLowerCase() == 'aye').length > 0
            ) {
                vote.vote = Vote.Aye;
            } else {
                vote.vote = Vote.Abstain;
            }
        }
        return data.items;
    }
}

export { DataStore, DataStoreDelegate };
