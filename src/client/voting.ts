import { DataStore, DataStoreDelegate } from './data/data-store';
import { UI, UIDelegate } from './ui/ui';

class Voting {
    private readonly ui: UI;
    private readonly dataStore: DataStore;

    private readonly dataStoreDelegate = <DataStoreDelegate>{};

    private readonly uiDelegate = <UIDelegate>{
        onRecalculateVotes: () => {
            this.start();
        },
        onTrackParticipationChange: (trackId: number, value: number) => {
            this.dataStore.changeTrackParticipation(trackId, value);
        },
        onTrackQuorumChange: (trackId: number, value: number) => {
            this.dataStore.changeTrackQuorum(trackId, value);
        },
        onTrackMajorityChange: (trackId: number, value: number) => {
            this.dataStore.changeTrackMajority(trackId, value);
        },
    };

    constructor() {
        this.dataStore = new DataStore(this.dataStoreDelegate);
        this.ui = new UI(this.uiDelegate);
    }

    async start() {
        this.ui.clearReferendumList();
        this.ui.lock();
        try {
            const mirrorReferendumList = await this.dataStore.fetchMirrorReferenda();
            this.ui.displayMirrorReferendumList(mirrorReferendumList);
        } catch (error) {
            alert(`Error while fetching referenda: ${error}. Please retry.`);
        }
        this.ui.unlock();
    }
}

export { Voting };
