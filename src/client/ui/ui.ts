import { MirrorReferendum, Vote } from '../data/types';
import { MEMBERS, VOTING_POLICY } from '../util/constants';
import { getTrackShortName } from '../util/format';
import { hide, show } from '../util/ui-util';

interface UIDelegate {
    onRecalculateVotes(): void;
    onTrackParticipationChange(trackId: number, value: number): void;
    onTrackQuorumChange(trackId: number, value: number): void;
    onTrackMajorityChange(trackId: number, value: number): void;
}

class UI {
    private readonly root: HTMLElement;
    private readonly content: HTMLDivElement;
    private readonly loadingContainer: HTMLDivElement;
    private readonly votingPolicyTitle: HTMLDivElement;
    private readonly votingPolicyTitleChevron: HTMLDivElement;
    private readonly votingPolicy: HTMLDivElement;
    private readonly mirrorReferendumList: HTMLDivElement;
    private readonly trackSelect: HTMLInputElement;
    private readonly trackParticipationSelect: HTMLInputElement;
    private readonly trackQuorumSelect: HTMLInputElement;
    private readonly trackMajoritySelect: HTMLInputElement;
    private readonly recalculateVotesButton: HTMLInputElement;

    private delegate: UIDelegate;

    constructor(delegate: UIDelegate) {
        this.delegate = delegate;
        this.root = <HTMLElement>document.getElementById('root');
        this.content = <HTMLDivElement>document.getElementById('content');
        this.loadingContainer = <HTMLDivElement>document.getElementById('loading-container');
        this.votingPolicyTitle = <HTMLDivElement>document.getElementById('voting-policy-title');
        this.votingPolicyTitleChevron = <HTMLDivElement>(
            document.getElementById('voting-policy-title-chevron')
        );
        this.votingPolicy = <HTMLDivElement>document.getElementById('voting-policy');
        this.mirrorReferendumList = <HTMLDivElement>(
            document.getElementById('mirror-referendum-list')
        );
        this.trackSelect = <HTMLInputElement>document.getElementById('track-select');
        this.trackParticipationSelect = <HTMLInputElement>(
            document.getElementById('track-participation-select')
        );
        this.trackQuorumSelect = <HTMLInputElement>document.getElementById('track-quorum-select');
        this.trackMajoritySelect = <HTMLInputElement>(
            document.getElementById('track-majority-select')
        );
        this.recalculateVotesButton = <HTMLInputElement>(
            document.getElementById('recalculate-votes-button')
        );

        for (let i = 0; i <= 100; i++) {
            const participationOption = document.createElement('option');
            participationOption.innerHTML = `${i}%`;
            participationOption.value = `${i / 100}`;
            this.trackParticipationSelect.append(participationOption);
            const quorumOption = document.createElement('option');
            quorumOption.innerHTML = `${i}%`;
            quorumOption.value = `${i / 100}`;
            this.trackQuorumSelect.append(quorumOption);
            const majorityOption = document.createElement('option');
            majorityOption.innerHTML = `${i}%`;
            majorityOption.value = `${i / 100}`;
            this.trackMajoritySelect.append(majorityOption);
        }

        setTimeout(() => {
            this.recalculateVotesButton.addEventListener('click', (_event) => {
                this.delegate.onRecalculateVotes();
            });
            this.trackSelect.addEventListener('change', (_event) => {
                this.onTrackChanged();
            });
            this.trackParticipationSelect.addEventListener('change', (_event) => {
                const trackId = Number(this.trackSelect.value).valueOf();
                const value = Number(this.trackParticipationSelect.value);
                this.delegate.onTrackParticipationChange(trackId, value);
            });
            this.trackQuorumSelect.addEventListener('change', (_event) => {
                const trackId = Number(this.trackSelect.value).valueOf();
                const value = Number(this.trackParticipationSelect.value);
                this.delegate.onTrackQuorumChange(trackId, value);
            });
            this.trackMajoritySelect.addEventListener('change', (_event) => {
                const trackId = Number(this.trackSelect.value).valueOf();
                const value = Number(this.trackParticipationSelect.value);
                this.delegate.onTrackMajorityChange(trackId, value);
            });
            this.votingPolicyTitle.addEventListener('click', (_event) => {
                if (this.votingPolicy.classList.contains('no-display')) {
                    this.votingPolicy.classList.remove('no-display');
                    this.votingPolicyTitleChevron.classList.remove('fa-chevron-right');
                    this.votingPolicyTitleChevron.classList.add('fa-chevron-down');
                } else {
                    this.votingPolicy.classList.add('no-display');
                    this.votingPolicyTitleChevron.classList.add('fa-chevron-right');
                    this.votingPolicyTitleChevron.classList.remove('fa-chevron-down');
                }
            });
            this.onTrackChanged();
        }, 10);
    }

    private onTrackChanged() {
        const policy = VOTING_POLICY.get(Number(this.trackSelect.value).valueOf())!;
        this.trackParticipationSelect.value = policy.participation.toString();
        this.trackQuorumSelect.value = policy.quorum.toString();
        this.trackMajoritySelect.value = policy.majority.toString();
    }

    clearReferendumList() {
        this.mirrorReferendumList.innerHTML = '';
    }

    lock() {
        this.trackSelect.disabled = true;
        this.trackParticipationSelect.disabled = true;
        this.trackQuorumSelect.disabled = true;
        this.trackMajoritySelect.disabled = true;
        this.recalculateVotesButton.disabled = true;
        show(this.loadingContainer);
    }

    unlock() {
        this.trackSelect.disabled = false;
        this.trackParticipationSelect.disabled = false;
        this.trackQuorumSelect.disabled = false;
        this.trackMajoritySelect.disabled = false;
        this.recalculateVotesButton.disabled = false;
        hide(this.loadingContainer);
    }

    displayMirrorReferendumList(mirrorReferendumList: MirrorReferendum[]) {
        for (const mirrorReferendum of mirrorReferendumList) {
            const div = document.createElement('div');
            div.id = `mirror-referendum-${mirrorReferendum._id}`;
            div.classList.add('mirror-referendum');
            const title = `[${getTrackShortName(mirrorReferendum.helperData.track)}] ${mirrorReferendum.helperData.network} #${mirrorReferendum.helperData.referendumId}: ${mirrorReferendum.helperData.title}`;
            let divHTML = `<div class="mirror-referendum-title">${title}</div>`;
            divHTML += `<div class="mirror-referendum-vote-counts"><span>🗳️</span><span class="aye">${mirrorReferendum.voteSummary.ayeCount}</span><span>•</span><span class="nay">${mirrorReferendum.voteSummary.nayCount}</span><span>•</span><span class="abstain">${mirrorReferendum.voteSummary.abstainCount}</span></div>`;
            // verdict
            divHTML += '<div class="mirror-referendum-verdict"><span>⚖️</span>';
            switch (mirrorReferendum.voteSummary.verdict) {
                case Vote.Aye:
                    divHTML += '<span class="aye">AYE</span>';
                    break;
                case Vote.Nay:
                    divHTML += '<span class="nay">NAY</span>';
                    break;
                case Vote.Abstain:
                    divHTML += '<span class="abstain">ABSTAIN</span>';
                    break;
            }
            divHTML += '</div>';
            // stats
            divHTML += `<div class="mirror-referendum-subsection-title" id="mirror-referendum-stats-title-${mirrorReferendum._id}"><em class="fas fa-chevron-right" id="mirror-referendum-stats-title-chevron-${mirrorReferendum._id}"></em>STATS</div>`;
            divHTML += `<div class="mirror-referendum-subsection no-display" id="mirror-referendum-stats-${mirrorReferendum._id}">`;
            divHTML += `<div class="mirror-referendum-stat"><div class="mirror-referendum-stat-title">Participation:</div><div class="mirror-referendum-stat-value">${Math.floor(mirrorReferendum.voteSummary.participation * 100)}%</div></div>`;
            divHTML += `<div class="mirror-referendum-stat"><div class="mirror-referendum-stat-title">Quorum:</div><div class="mirror-referendum-stat-value">${Math.floor(mirrorReferendum.voteSummary.quorum * 100)}%</div></div>`;
            divHTML += `<div class="mirror-referendum-stat"><div class="mirror-referendum-stat-title">Majority:</div><div class="mirror-referendum-stat-value">${Math.floor(mirrorReferendum.voteSummary.majority * 100)}%</div></div>`;
            divHTML += '</div>';
            // track stats
            const trackPolicy = VOTING_POLICY.get(mirrorReferendum.helperData.track)!;
            const participationMet =
                mirrorReferendum.voteSummary.participation >= trackPolicy.participation;
            let participationMark = '';
            if (participationMet) {
                participationMark = '<em class="fas fa-check aye"></em>';
            } else {
                participationMark = '<em class="fas fa-times nay"></em>';
            }
            const quorumMet = mirrorReferendum.voteSummary.quorum >= trackPolicy.quorum;
            let quorumMark = '';
            if (quorumMet) {
                quorumMark = '<em class="fas fa-check aye"></em>';
            } else {
                quorumMark = '<em class="fas fa-times nay"></em>';
            }
            const majorityMet = mirrorReferendum.voteSummary.majority >= trackPolicy.majority;
            let majorityMark = '';
            if (majorityMet) {
                majorityMark = '<em class="fas fa-check aye"></em>';
            } else {
                majorityMark = '<em class="fas fa-times nay"></em>';
            }
            divHTML += `<div class="mirror-referendum-subsection-title" id="mirror-referendum-track-policy-title-${mirrorReferendum._id}"><em class="fas fa-chevron-right" id="mirror-referendum-track-policy-title-chevron-${mirrorReferendum._id}"></em>TRACK POLICY</div>`;
            divHTML += `<div class="mirror-referendum-subsection no-display" id="mirror-referendum-track-policy-${mirrorReferendum._id}">`;
            divHTML += `<div class="mirror-referendum-stat"><div class="mirror-referendum-stat-title">Participation:</div><div class="mirror-referendum-stat-value">${Math.floor(trackPolicy.participation * 100)}%</div>${participationMark}</div>`;
            divHTML += `<div class="mirror-referendum-stat"><div class="mirror-referendum-stat-title">Quorum:</div><div class="mirror-referendum-stat-value">${Math.floor(trackPolicy.quorum * 100)}%</div>${quorumMark}</div>`;
            divHTML += `<div class="mirror-referendum-stat"><div class="mirror-referendum-stat-title">Majority:</div><div class="mirror-referendum-stat-value">${Math.floor(trackPolicy.majority * 100)}%</div>${majorityMark}</div>`;
            divHTML += '</div>';
            // votes
            divHTML += `<div class="mirror-referendum-subsection-title" id="mirror-referendum-votes-title-${mirrorReferendum._id}"><em class="fas fa-chevron-right" id="mirror-referendum-votes-title-chevron-${mirrorReferendum._id}"></em>VOTES</div>`;
            divHTML += `<div class="mirror-referendum-subsection no-display" id="mirror-referendum-votes-${mirrorReferendum._id}">`;
            for (const vote of mirrorReferendum.votes) {
                const member = MEMBERS.get(vote.voter)!;
                divHTML += '<div class="mirror-referendum-vote">';
                switch (vote.vote) {
                    case Vote.Aye:
                        divHTML += '<div class="mirror-referendum-vote-member-vote aye-bg"></div>';
                        break;
                    case Vote.Nay:
                        divHTML += '<div class="mirror-referendum-vote-member-vote nay-bg"></div>';
                        break;
                    case Vote.Abstain:
                        divHTML +=
                            '<div class="mirror-referendum-vote-member-vote abstain-bg"></div>';
                        break;
                }
                divHTML += `<div class="mirror-referendum-vote-member">${member}</div>`;
                divHTML += '</div>';
            }
            divHTML += '</div>';

            div.innerHTML = divHTML;
            this.mirrorReferendumList.append(div);
            // stats
            setTimeout(() => {
                const statsTitle = document.getElementById(
                    `mirror-referendum-stats-title-${mirrorReferendum._id}`,
                );
                const statsTitleChevron = document.getElementById(
                    `mirror-referendum-stats-title-chevron-${mirrorReferendum._id}`,
                );
                const stats = document.getElementById(
                    `mirror-referendum-stats-${mirrorReferendum._id}`,
                );
                if (statsTitle && statsTitleChevron && stats) {
                    statsTitle.addEventListener('click', (_event) => {
                        if (stats.classList.contains('no-display')) {
                            show(stats);
                            statsTitleChevron.classList.remove('fa-chevron-right');
                            statsTitleChevron.classList.add('fa-chevron-down');
                        } else {
                            hide(stats);
                            statsTitleChevron.classList.add('fa-chevron-right');
                            statsTitleChevron.classList.remove('fa-chevron-down');
                        }
                    });
                }
            }, 10);
            // track policy
            setTimeout(() => {
                const trackPolicyTitle = document.getElementById(
                    `mirror-referendum-track-policy-title-${mirrorReferendum._id}`,
                );
                const trackPolicyTitleChevron = document.getElementById(
                    `mirror-referendum-track-policy-title-chevron-${mirrorReferendum._id}`,
                );
                const trackPolicy = document.getElementById(
                    `mirror-referendum-track-policy-${mirrorReferendum._id}`,
                );
                if (trackPolicyTitle && trackPolicyTitleChevron && trackPolicy) {
                    trackPolicyTitle.addEventListener('click', (_event) => {
                        if (trackPolicy.classList.contains('no-display')) {
                            show(trackPolicy);
                            trackPolicyTitleChevron.classList.remove('fa-chevron-right');
                            trackPolicyTitleChevron.classList.add('fa-chevron-down');
                        } else {
                            hide(trackPolicy);
                            trackPolicyTitleChevron.classList.add('fa-chevron-right');
                            trackPolicyTitleChevron.classList.remove('fa-chevron-down');
                        }
                    });
                }
            }, 10);
            // votes
            setTimeout(() => {
                const votesTitle = document.getElementById(
                    `mirror-referendum-votes-title-${mirrorReferendum._id}`,
                );
                const votesTitleChevron = document.getElementById(
                    `mirror-referendum-votes-title-chevron-${mirrorReferendum._id}`,
                );
                const votes = document.getElementById(
                    `mirror-referendum-votes-${mirrorReferendum._id}`,
                );
                if (votesTitle && votesTitleChevron && votes) {
                    votesTitle.addEventListener('click', (_event) => {
                        if (votes.classList.contains('no-display')) {
                            show(votes);
                            votesTitleChevron.classList.remove('fa-chevron-right');
                            votesTitleChevron.classList.add('fa-chevron-down');
                        } else {
                            hide(votes);
                            votesTitleChevron.classList.add('fa-chevron-right');
                            votesTitleChevron.classList.remove('fa-chevron-down');
                        }
                    });
                }
            }, 10);
        }
    }
}

export { UI, UIDelegate };
