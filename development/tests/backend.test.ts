/**
 * @jest-environment node
 */

import { getArgs, getPathsOfManifest } from "../server/functions";
import { lengthObjValues, checkFields } from "../functions";

const originalArgv = process.argv;

beforeEach(() => {
    jest.resetModules();

    process.argv = [ "/process", "/process/index.js", "NODE_ENV=development" ];
});

afterEach(() => {
    process.argv = originalArgv;
});

describe("functions", () => {
    test("getArgs", () => {
        const mockGetArgs = jest.fn(getArgs);
    
        const result = {
            NODE_ENV: "development"
        };
    
        mockGetArgs();
    
        expect(mockGetArgs).toBeCalled();
        expect(mockGetArgs.mock.results[0].value).toEqual(result);
    });

    test("lengthObjValues", () => {
        const mockLengthObjValues = jest.fn(lengthObjValues);

        const arg = {
            client: [ 'index.css', 'client.js' ],
            'runtime~client': [ 'runtime~client.js' ],
            'client-libraries': [ 'client-libraries.bundle.js' ]
        }

        mockLengthObjValues(arg);

        expect(mockLengthObjValues).toBeCalledTimes(1);
        expect(mockLengthObjValues.mock.results[0].value).toBe(4);
    });

    test("checkFields", () => {
        const mockCheckFields = jest.fn(checkFields);

        const arg1 = {
            id: "hdsfjhadsf2141234sdaff",
            email: "asdfasdf@asdfasdf.gmail"
        };

        const arg2 = {
            id: "hdsfjhadsf2141234sdaff",
            name: "q",
            email: "asdfasdf@asdfasdf.gmail",
            object: "q",
            message: "e"
        };

        const keys = Object.keys(arg2);

        mockCheckFields(arg1, ...keys);
        mockCheckFields(arg2, ...keys);

        expect(mockCheckFields.mock.results[0].value).toBeFalsy();
        expect(mockCheckFields.mock.results[1].value).toBeTruthy();
    });

    test("getPathsOfManifest", () => {
        const mockGetPathsOfManifest = jest.fn(getPathsOfManifest);

        const arg = `
            {
                "client.css": "/client.css",
                "client.js": "/client.js",
                "runtime~client.js": "/runtime~client.js"
            }
        `;

        const result_1 = '<link rel="stylesheet" href="/client.css">';
        const result_2 = '<script defer src="/client.js"></script>\n<script defer src="/runtime~client.js"></script>';

        mockGetPathsOfManifest(arg, "css");
        mockGetPathsOfManifest(arg, "js");

        expect(mockGetPathsOfManifest.mock.results[0].value).toEqual(result_1);
        expect(mockGetPathsOfManifest.mock.results[1].value).toEqual(result_2);
    });
});