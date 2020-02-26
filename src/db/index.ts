
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

interface IFeatures {
    [key: string]: [number, number]
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
    features: IFeatures
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
    features: {},
};

export async function loadExampleDataset() {
    return loadFromUrl(process.env.NODE_ENV === 'production' ? '/ms2ldaviewer/examples/example.json' : '/examples/example.json');
}

export async function loadFromUrl(url: string) {
    const response = await fetch(url);
    const dataset: IDataset = await response.json();
    return dataset;
}

const readUploadedFileAsText = (inputFile: File): Promise<string> => {
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      reader.onload = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject(new DOMException("Problem parsing input file."));
          }
      };
      reader.readAsText(inputFile);
    });
  };

export async function loadFromFile(file: File) {
    const body = await readUploadedFileAsText(file);
    return JSON.parse(body);
}