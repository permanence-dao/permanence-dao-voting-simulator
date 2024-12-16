import { MirrorReferendumHelperData, Network, Track, TrackVotingPolicy } from '../data/types';

export abstract class Constants {
    // RPC
    static readonly KUSAMA_RPC_URL = 'wss://rpc.ibp.network/kusama';
    static readonly POLKADOT_RPC_URL = 'wss://rpc.ibp.network/polkadot';
    // connection
    static readonly CONNECTION_TIMEOUT_MS = 30000;
    static readonly CONNECTION_RETRY_MS = 5000;
    // UI
    static readonly HASH_TRIM_SIZE = 7;
    static readonly CONTENT_FADE_ANIM_DURATION_MS = 300;
    static readonly ARTIFICIAL_DELAY_MS = 1500;
    // format
    static readonly BALANCE_FORMAT_DECIMALS = 4;
    static readonly DECIMAL_SEPARATOR = '.';
    static readonly THOUSANDS_SEPARATOR = ',';
    static readonly MAX_IDENTITY_DISPLAY_LENGTH = 24;
}

export abstract class Kusama {
    static readonly DECIMAL_COUNT = 12;
}

export abstract class Polkadot {
    static readonly DECIMAL_COUNT = 10;
}

export const VOTING_POLICY = new Map<Track, TrackVotingPolicy>();
VOTING_POLICY.set(Track.WishForChange, {
    participation: 0.0,
    quorum: 0.6,
    majority: 0.57,
});
VOTING_POLICY.set(Track.Treasurer, {
    participation: 0.0,
    quorum: 0.6,
    majority: 0.57,
});
VOTING_POLICY.set(Track.FellowshipAdmin, {
    participation: 0.0,
    quorum: 0.6,
    majority: 0.57,
});
VOTING_POLICY.set(Track.SmallTipper, {
    participation: 0.3,
    quorum: 0.0,
    majority: 0.5,
});
VOTING_POLICY.set(Track.BigTipper, {
    participation: 0.35,
    quorum: 0.0,
    majority: 0.5,
});
VOTING_POLICY.set(Track.SmallSpender, {
    participation: 0.5,
    quorum: 0.0,
    majority: 0.5,
});
VOTING_POLICY.set(Track.MediumSpender, {
    participation: 0.0,
    quorum: 0.5,
    majority: 0.5,
});
VOTING_POLICY.set(Track.BigSpender, {
    participation: 0.0,
    quorum: 0.6,
    majority: 0.57,
});

export const MEMBERS = new Map<string, string>();
MEMBERS.set('1ZSPR3zNg5Po3obkhXTPR95DepNBzBZ3CyomHXGHK9Uvx6w', 'W1ZSPR3');
MEMBERS.set('1xzcLSwo7xBFkJYZiL4EHaqFpuPTkH641E3V43W4cuk1bX6', 'PolkaBiz');
MEMBERS.set('12His7t3EJ38tjdBbivUzWQeaNCLKfMqtKp1Ed3xHMyCE9N3', 'The Ionian Group');
MEMBERS.set('12s6UMSSfE2bNxtYrJc6eeuZ7UxQnRpUzaAh1gPQrGNFnE8h', 'Polkadotters');
MEMBERS.set('13EDmaUe89xXocPppFmuoAZaCsckaJy3deAyVyiykk1zKQbF', 'PMEI');
MEMBERS.set('14333MZvbGkcq5CZ8fYHZiFYwHNDaW3uiErDKMb7oqnupWXn', 'Transistor');
MEMBERS.set('14gMJV95zwxUsFEZDSC8mtBVifS6SypKJkfBKANkMsLZdeVb', 'Yongfeng Li');
MEMBERS.set('14Gn7SEmCgMX7Ukuppnw5TRjA7pao2HFpuJo39frB42tYLEh', 'Ezio Red');
MEMBERS.set('15fTH34bbKGMUjF1bLmTqxPYgpg481imThwhWcQfCyktyBzL', 'Helikon');
MEMBERS.set('167YoKNriVtP4Nxk9F9GRV7HTKu5VnxaRq1pKMANAnmmTY9F', 'José Rabasso');

export const MIRROR_REFERENDUM_HELPER_DATA = new Map<string, MirrorReferendumHelperData>();
MIRROR_REFERENDUM_HELPER_DATA.set('672c7cfd355f17287ad907b5', {
    _id: '672c7cfd355f17287ad907b5',
    cid: 'QmafjdEKTvqE6fTjnAGFoMTWy6z5FjJ6xaCYJompgDbWZZ',
    network: Network.Polkadot,
    referendumId: 1218,
    track: Track.MediumSpender,
    title: 'Treasury Proposal for Funding the JAMTON Project',
});
MIRROR_REFERENDUM_HELPER_DATA.set('671bc7d1355f17287ad9079c', {
    _id: '671bc7d1355f17287ad9079c',
    cid: 'QmR8HVrgGGPL3zyBwPvycjfa9TrEekZddDFZ4qemj2Jjzq',
    network: Network.Polkadot,
    referendumId: 1239,
    track: Track.MediumSpender,
    title: 'Opt-In Tip for DV Cohort 2 - Saxemberg',
});
MIRROR_REFERENDUM_HELPER_DATA.set('671bc83a355f17287ad9079e', {
    _id: '671bc83a355f17287ad9079e',
    cid: 'QmWUq6qQjrV56HmRFkUsUJfL1E5VpttKzoPZAsuhuwZ8Fr',
    network: Network.Polkadot,
    referendumId: 1245,
    track: Track.MediumSpender,
    title: 'Draper University x Polkadot Pre-Accelerator Silicon Valley',
});
MIRROR_REFERENDUM_HELPER_DATA.set('671bc75c355f17287ad9079b', {
    _id: '671bc75c355f17287ad9079b',
    cid: 'QmbaNTV3tQWwdyEECMsNyy7vaZwKeSd756BXPaiSc2qcbg',
    network: Network.Polkadot,
    referendumId: 1246,
    track: Track.MediumSpender,
    title: '$DED Holiday Marketing Campaign - Korea and Japan',
});
MIRROR_REFERENDUM_HELPER_DATA.set('671bc609355f17287ad9079a', {
    _id: '671bc609355f17287ad9079a',
    cid: 'Qmd9rTJfryyKvHm8XfLd8FnA87NTB9nPxcYWemXwM2cZ5Q',
    network: Network.Polkadot,
    referendumId: 1247,
    track: Track.FellowshipAdmin,
    title: 'Remove all 19 Head Ambassadors',
});
MIRROR_REFERENDUM_HELPER_DATA.set('671bc806355f17287ad9079d', {
    _id: '671bc806355f17287ad9079d',
    cid: 'QmNgM4rbKtmfkqgGoVyzHBmk83X9PtGPEAnh4KozwosYXv',
    network: Network.Polkadot,
    referendumId: 1249,
    track: Track.WishForChange,
    title: 'Inclusion of Acurast in Marketing Narratives',
});
MIRROR_REFERENDUM_HELPER_DATA.set('671bc882355f17287ad9079f', {
    _id: '671bc882355f17287ad9079f',
    cid: 'QmPifdm56hzy7GRBAXJqkktdKdyn6VGfk36PobDbmETi7s',
    network: Network.Polkadot,
    referendumId: 1250,
    track: Track.MediumSpender,
    title: 'Polkadot Open Source Developer Grants Bounty Program Curator Candidacy',
});
MIRROR_REFERENDUM_HELPER_DATA.set('6728f58c355f17287ad907b2', {
    _id: '6728f58c355f17287ad907b2',
    cid: 'QmXv11vF8VJZHsSkYtDyJ5cFJppz5vd3JfLMAHaw4KqNVw',
    network: Network.Polkadot,
    referendumId: 1252,
    track: Track.BigSpender,
    title: 'Artemis Analytics Integration',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e770a355f17287ad907c9', {
    _id: '672e770a355f17287ad907c9',
    cid: 'QmYD4ByVpUmC4PTdruSUgvJE59baiuHvX96f5NsdmCVPC6',
    network: Network.Polkadot,
    referendumId: 1260,
    track: Track.MediumSpender,
    title: "Continued Management of Polkadot's X Account",
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e7750355f17287ad907cc', {
    _id: '672e7750355f17287ad907cc',
    cid: 'QmYCj5vkvPbb1Jii6NwUx2KTHot8UuiaqpnmcinWSXf8NS',
    network: Network.Polkadot,
    referendumId: 1261,
    track: Track.SmallSpender,
    title: 'Polkadot Growth Initiative',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e75e8355f17287ad907c0', {
    _id: '672e75e8355f17287ad907c0',
    cid: 'QmSHSoBS927zQv2FY78p21GfyLSQrefitXomiKHxzCzNT4',
    network: Network.Polkadot,
    referendumId: 1262,
    track: Track.MediumSpender,
    title: 'Infrastructure Funding for Polkadot Asset Hub #3 - Atomic swaps, Offers, Maintenance',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e77cb355f17287ad907d2', {
    _id: '672e77cb355f17287ad907d2',
    cid: 'QmShu6N7kSpS1VtA2Bo9Ci3ZGXC7rFCZ4P5kcndccG1JoU',
    network: Network.Polkadot,
    referendumId: 1264,
    track: Track.MediumSpender,
    title: 'PolkaGate: One-Year Retroactive Funding',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e763a355f17287ad907c3', {
    _id: '672e763a355f17287ad907c3',
    cid: 'QmNPdvGwq2V7VhCK2qz2NzedJanxE7cCFquCMBLnM9UX1N',
    network: Network.Polkadot,
    referendumId: 1265,
    track: Track.MediumSpender,
    title: 'Unlocking Growth with a 6-Month PolkAchiever Campaign and AirLyft Enterprise Suite Access',
});
MIRROR_REFERENDUM_HELPER_DATA.set('67271eed355f17287ad907ad', {
    _id: '67271eed355f17287ad907ad',
    cid: 'QmT4LNbWHqo4jBFAV2EwvkZKTcAcCzuwKRN7apVFByc77T',
    network: Network.Polkadot,
    referendumId: 1266,
    track: Track.MediumSpender,
    title: 'Apillon Milestone 3 Proposal',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e7680355f17287ad907c6', {
    _id: '672e7680355f17287ad907c6',
    cid: 'QmViGkMevffPJnh22PESBu3bR69oH7Spex7KS4sPJ4P6in',
    network: Network.Polkadot,
    referendumId: 1269,
    track: Track.MediumSpender,
    title: 'Polkadot Staking Dashboard & Developer Console 2024-25 Funding',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e75af355f17287ad907bd', {
    _id: '672e75af355f17287ad907bd',
    cid: 'QmcQfioLR768ZRtDgipLiguMUnKX1KcnxVf8X4EuJuqPXL',
    network: Network.Polkadot,
    referendumId: 1274,
    track: Track.MediumSpender,
    title: 'Polkadot Ecosystem Support with DefiLlama Research',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e778b355f17287ad907cf', {
    _id: '672e778b355f17287ad907cf',
    cid: 'QmXUS7Hprj51VvVA4jQvE1HY6DmMYDepQUxbL6KtJkVvxm',
    network: Network.Polkadot,
    referendumId: 1278,
    track: Track.MediumSpender,
    title: 'Proposal: Meetups Bounty #43 top-up & changes',
});
MIRROR_REFERENDUM_HELPER_DATA.set('672e752a355f17287ad907ba', {
    _id: '672e752a355f17287ad907ba',
    cid: 'QmcYmMo2YwUPuJQfCYWhjckm3bC5LBLMVzcDogJeQ1EhFA',
    network: Network.Polkadot,
    referendumId: 1279,
    track: Track.MediumSpender,
    title: 'Polkadot marketing proposal in Chinese speaking areas',
});
MIRROR_REFERENDUM_HELPER_DATA.set('673ccf9d355f17287ad907da', {
    _id: '673ccf9d355f17287ad907da',
    cid: 'QmUaQ9vxxPEmSkdg5WUXXsTYYyqaXbGu6JcivatzPtW8P5',
    network: Network.Polkadot,
    referendumId: 1232,
    track: Track.BigSpender,
    title: 'Talisman Wallet and Portal Retroactive Funding',
});
MIRROR_REFERENDUM_HELPER_DATA.set('673cf7fa355f17287ad907e0', {
    _id: '673cf7fa355f17287ad907e0',
    cid: 'QmR8fxZzoPgPWRVEdrabGxW8DqAZSQkaRBUD2SbCFUNKJE',
    network: Network.Polkadot,
    referendumId: 1258,
    track: Track.SmallSpender,
    title: 'Publishing and promoting the documentary, “Blockchain Gaming,” by the Polkadot community.',
});
MIRROR_REFERENDUM_HELPER_DATA.set('673cfbeb355f17287ad907e3', {
    _id: '673cfbeb355f17287ad907e3',
    cid: 'QmPDm9BF2B6AYfumX242Tc1wSUSMuUSdSSXsjBS7sSjBq9',
    network: Network.Polkadot,
    referendumId: 1276,
    track: Track.SmallSpender,
    title: 'TIP for the activities made by the Polkadot Mexican Collective',
});
MIRROR_REFERENDUM_HELPER_DATA.set('673cf6a3355f17287ad907dd', {
    _id: '673cf6a3355f17287ad907dd',
    cid: '',
    network: Network.Polkadot,
    referendumId: 1254,
    track: Track.WishForChange,
    title: 'Bounty Compliance Standards 1.0',
});
MIRROR_REFERENDUM_HELPER_DATA.set('673d81c7355f17287ad907f6', {
    _id: '673d81c7355f17287ad907f6',
    cid: 'QmX8TkUbTMf8UHzXC8Wm5X9a3M9SjkvEAX5YKbBDp65wFZ',
    network: Network.Polkadot,
    referendumId: 1272,
    track: Track.BigSpender,
    title: 'Crystal Intelligence Blockchain Intelligence Proposal',
});

MIRROR_REFERENDUM_HELPER_DATA.set('6742b966355f17287ad90811', {
    _id: '6742b966355f17287ad90811',
    cid: 'Qmf4VoXqZbv9memRa5EozWLrucESXVzBuvUyanA65HJTbW',
    network: Network.Polkadot,
    referendumId: 1289,
    track: Track.MediumSpender,
    title: 'Fuelarts x BitBasel | Creative Tech Accelerator for Polkadot',
});
MIRROR_REFERENDUM_HELPER_DATA.set('6740c3e1355f17287ad90809', {
    _id: '6740c3e1355f17287ad90809',
    cid: 'QmenFRb236AUqneqyiCgx5Fzv6XLKCRzRW7c3JiceBVprv',
    network: Network.Polkadot,
    referendumId: 1309,
    track: Track.BigTipper,
    title: "Web Summit: Targeting Web2 companies to explore Polkadot's solutions to solve their problems.",
});
MIRROR_REFERENDUM_HELPER_DATA.set('67521632bfbddc9f354aff0e', {
    _id: '67521632bfbddc9f354aff0e',
    cid: 'QmPvYvtngnF9CQHc9TsGDZobXrpX2ZGM8YA3WQqY28ZufH',
    network: Network.Polkadot,
    referendumId: 1301,
    track: Track.SmallSpender,
    title: 'Treasury Proposal: Funding for Enhancing Substrate Fast Sync for Large Chain States',
});

MIRROR_REFERENDUM_HELPER_DATA.set('675889eabfbddc9f354aff31', {
    _id: '675889eabfbddc9f354aff31',
    cid: 'QmV7zRJ1EC5gaQtHHUEKq7j4QNQUWzYjzw9F85eCqNRRDL',
    network: Network.Polkadot,
    referendumId: 1330,
    track: Track.SmallSpender,
    title: 'TIP for DDS and Lucy',
});
MIRROR_REFERENDUM_HELPER_DATA.set('67588935bfbddc9f354aff2b', {
    _id: '67588935bfbddc9f354aff2b',
    cid: 'QmbKBekv8hao6htAznejiquzEdap3DhAGKeLoTmBj33XtG',
    network: Network.Polkadot,
    referendumId: 1300,
    track: Track.SmallSpender,
    title: 'SolidityScan Polkadot Proposal',
});
MIRROR_REFERENDUM_HELPER_DATA.set('6758898ebfbddc9f354aff2e', {
    _id: '6758898ebfbddc9f354aff2e',
    cid: 'QmR9dKvXKiaLJTznScmEAHwu54kw3Xnjp4iLhFawuMzBjr',
    network: Network.Polkadot,
    referendumId: 1318,
    track: Track.SmallSpender,
    title: 'PROPOSAL EDUCATING IN LATIN AMERICA WITH THE POLKADOT ECOSYSTEM PART 2',
});
MIRROR_REFERENDUM_HELPER_DATA.set('675d31bebfbddc9f354aff3b', {
    _id: '675d31bebfbddc9f354aff3b',
    cid: 'QmNVpr1PjkzHbVb7CqPs35XzGJzm1Q3bH8cArm63zwp3Kr',
    network: Network.Polkadot,
    referendumId: 1312,
    track: Track.MediumSpender,
    title: 'Encode x Polkadot 2024: Tranche 1 update and discussion ahead of request for Tranche 2',
});
MIRROR_REFERENDUM_HELPER_DATA.set('6758867ebfbddc9f354aff1a', {
    _id: '6758867ebfbddc9f354aff1a',
    cid: 'QmXMuy25H6mArzvbmev9zGVxwHuMSEGVk8Qs2MVZxMKJ7g',
    network: Network.Polkadot,
    referendumId: 1297,
    track: Track.Treasurer,
    title: 'Closing Bounty 39. BD (Business Development) Bounty',
});
MIRROR_REFERENDUM_HELPER_DATA.set('675fcca1bfbddc9f354aff41', {
    _id: '675fcca1bfbddc9f354aff41',
    cid: 'QmTJk3vciwZrrWgqDsr1GKbY9dM1bYMr9LveLCEAcpvvfM',
    network: Network.Polkadot,
    referendumId: 1314,
    track: Track.MediumSpender,
    title: 'Milestone 1: EasyA x Polkadot: In-person hackathons and in-app Polkadot 2.0 crash course (#360DaysOfPolkadot)',
});
