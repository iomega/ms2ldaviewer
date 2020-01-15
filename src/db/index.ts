
export interface IDocMetadata {
    filename: string
    precursormass: number
    parentmass: number
    parentintensity: number
    scans: string
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

interface IBetas {
    // Topic
    [key: string]: {
        // Feature
        [key: string]: number
    }
}

interface IThetas {
     // Spectra aka Document
     [key: string]: {
        // Motif aka Topic with prob
        [key: string]: number
    }
}

interface IOverlapScores {
    // Spectra aka Document
    [key: string]: {
       // Motif aka Topic with overlap score
       [key: string]: number
   }
}

interface ITopicMetadata {
    name: string
    type: string
}

interface ITopicMetadatas {
    [key: string]: ITopicMetadata
}

export interface IDataset {
    K: number
    doc_metadata: {
        [key:string]: IDocMetadata
    },
    corpus: ICorpus
    phi: IPhi
    topic_metadata: ITopicMetadatas
    beta: IBetas
    theta: IThetas
    overlap_scores: IOverlapScores
}

export let dataset: IDataset = {
    K: 0,
    doc_metadata: {},
    corpus: {},
    phi: {},
    topic_metadata: {},
    beta: {},
    theta: {},
    overlap_scores: {},
};

export async function loadExampleDataset() {
    return loadFromUrl(process.env.NODE_ENV === 'production' ? '/ms2ldaviewer/examples/example.json' : '/examples/example.json');
}

export async function loadFromUrl(url: string) {
    const response = await fetch(url);
    const dataset: IDataset = await response.json();
    return Promise.resolve(dataset);
}
