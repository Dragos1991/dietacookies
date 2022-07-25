declare module 'extract-files/extractFiles.mjs' {
    export type ExtractableFile = File | Blob | ReactNativeFile;

    export interface ExtractableFileResult {
        clone: any;
        files: Map<ExtractableFile, string[]>;
    }

    export default function extractFiles(value: any, path?: string): ExtractableFileResult;
}

declare module 'extract-files/isExtractableFile.mjs';
