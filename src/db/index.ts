
interface IDocMetadata {
    filename: string
    precursormass: number
    parentmass: number
}

interface ICorpus {
    // Documents
    [key: string]: {
        // Features with their intensity
        [key: string]: number
    }
}

interface IPhi {
    // Documents
    [key: string]: {
        // Features 
        [key: string]: {
            // Topic with probability
            [key: string]: number
        }
    }
}

interface ITopicMetadata {
    name: string
    type: string
}

interface ITopicMetadatas {
    [key: string]: ITopicMetadata
}

interface IDataset {
    K: number
    doc_metadata: {
        [key:string]: IDocMetadata
    },
    corpus: ICorpus
    phi: IPhi
    topic_metadata: ITopicMetadatas
}

export let dataset: IDataset = {
    K: 0,
    doc_metadata: {},
    corpus: {},
    phi: {},
    topic_metadata: {}
};

export async function loadExampleDataset() {
    return loadFromUrl(process.env.NODE_ENV === 'production' ? '/ms2ldaviewer/examples/example.json' : '/examples/example.json');
}

export async function loadFromUrl(url: string) {
    const response = await fetch(url);
    dataset = await response.json();
    return Promise.resolve(dataset);
}
