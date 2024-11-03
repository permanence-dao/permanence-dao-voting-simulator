enum Network {
    Polkadot = 'DOT',
    Kusama = 'KSM',
}

enum Vote {
    Aye = 'Aye',
    Nay = 'Nay',
    Abstain = 'Abstain ',
}

enum Track {
    WishForChange = 2,
    Treasurer = 11,
    FellowshipAdmin = 13,
    SmallTipper = 30,
    BigTipper = 31,
    SmallSpender = 32,
    MediumSpender = 33,
    BigSpender = 34,
}

interface TrackVotingPolicy {
    participation: number;
    quorum: number;
    majority: number;
}

interface Member {
    address: string;
    name: string;
}

interface MirrorReferendumQueryPage {
    items: MirrorReferendum[];
    total: number;
    page: number;
    pageSize: number;
}

interface MirrorReferendum {
    _id: string;
    cid: string;
    space: string;
    postUid: string;
    title: string;
    content: string;
    status: string;
    votes: MirrorReferendumVote[];
    track: Track;
    helperData: MirrorReferendumHelperData;
    voteSummary: MirrorReferendumVoteSummary;
}

interface MirrorReferendumVote {
    _id: string;
    voter: string;
    proposal: string;
    address: string;
    choices: string[];
    cid: string;
    remark: string;
    vote: Vote;
}

interface MirrorReferendumVoteQueryPage {
    items: MirrorReferendumVote[];
    total: number;
    page: number;
    pageSize: number;
}

interface MirrorReferendumHelperData {
    _id: string;
    cid: string;
    network: Network;
    referendumId: number;
    track: Track;
    title: string;
}

interface MirrorReferendumVoteSummary {
    ayeCount: number;
    nayCount: number;
    abstainCount: number;
    participation: number;
    quorum: number;
    majority: number;
    verdict: Vote;
}

export {
    Member,
    Track,
    TrackVotingPolicy,
    MirrorReferendum,
    MirrorReferendumQueryPage,
    MirrorReferendumVote,
    MirrorReferendumVoteQueryPage,
    Network,
    MirrorReferendumHelperData,
    MirrorReferendumVoteSummary,
    Vote,
};
