import supertest from "supertest";
import { config } from "dotenv";
import { getArgs } from "../server/functions";

config();

const baseURI = `http://localhost:${process.env.PORT}`;

const getFullPath = (...paths: string[]): string => {
    const arrayOfPaths: string[] = [];
    paths.forEach(item => arrayOfPaths.push(`/${item}`));
    return arrayOfPaths.join("");
}

const originalArgv = process.argv;

beforeEach(() => {
    jest.resetModules();

    process.argv = [ "/process", "/process/index.js", "NODE_ENV=development" ];
});

afterEach(() => {
    process.argv = originalArgv;
});

describe("/blog", () => {
    const getPath = getFullPath.bind(null, "blog");
    const mockGetPath = jest.fn(getPath);

    test("check getPath", () => {
        const arrayOfAdditionalPaths = [ "searchInput", "columnPosts", "blogs" ];

        arrayOfAdditionalPaths.forEach(item => mockGetPath(item));

        expect(mockGetPath.mock.results.at(0)?.value).toBe(`/blog/${arrayOfAdditionalPaths.at(0)}`);
        expect(mockGetPath.mock.results.at(1)?.value).toBe(`/blog/${arrayOfAdditionalPaths.at(1)}`);
        expect(mockGetPath.mock.results.at(2)?.value).toBe(`/blog/${arrayOfAdditionalPaths.at(2)}`);
    });

    test("POST /searchInput", async () => {
        const testData = {
            value: "Hello, world"
        };

        const response = await supertest(baseURI)
        .post(mockGetPath("searchInput"))
        .send(testData)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

        expect(response.body?.status).toBe("success");
        expect(response.body?.message).toBe("Your search is saved");
    });

    test("GET /columnPosts", async () => {
        const response = await supertest(baseURI).get(mockGetPath("columnPosts"));

        expect(response.body?.status).toBe("success");
        expect(Array.isArray(response.body?.message)).toBeTruthy();
    });

    test("GET /blogs?lastId=5", async () => {
        const response = await supertest(baseURI).get(mockGetPath("blogs"));

        expect(response.body?.message?.blogs?.length).not.toBe(0);
        expect(response.body?.message?.lastId).toBe(3);
    });

    test("PATCH /blogs?id=0&typeUpdate=comments", async () => {
        const testData = {
            comments: [],
            countComments: 8
        };

        const response = await supertest(baseURI)
        .patch(mockGetPath("blogs?id=0&typeUpdate=comments"))
        .send(testData)
        .set("Content-type", "application/json")
        .set("Accept", "application/json");

        expect(response.body?.status).toBe("success");
        expect(response.body?.message).toBe("Comments were saved");
    });

    test("PATCH /blogs?id=0&typeUpdate=likes", async () => {
        const testData = {
            countLikes: 15,
            usersWhoLiked: []
        };

        const response = await supertest(baseURI)
        .patch(mockGetPath("blogs?id=0&typeUpdate=likes"))
        .send(testData)
        .set("Content-type", "application/json")
        .set("Accept", "application/json");
        
        expect(response.body?.status).toBe("success");
        expect(response.body?.message).toBe("Likes were saved");
    });

    test("PATCH /blogs?id=0&typeUpdate=wrongType", async () => {
        const response = await supertest(baseURI)
        .patch(mockGetPath("blogs?id=0&typeUpdate=wrongType"))
        .send({})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

        expect(response.status).toBe(404);
        expect(response.body?.status).toBe("fail")
        expect(response.body?.message).toBe("Wrong update type");
    });
});

describe("/contact", () => {
    const getPath = getFullPath.bind(null, "contact");
    const mockGetPath = jest.fn(getPath);

    test("POST /user (user didn`t registr)", async () => {
        const testData = {
            name: "Mike",
            email: "qwerty@gmail.com",
            object: "qwerty",
            message: "hello, world"
        };

        const response = await supertest(baseURI)
        .post(mockGetPath("user"))
        .send(testData)
        .set("Contect-Type", "application/json")
        .set("Accept", "application/json");

        expect(response.body).toEqual({});
    });

    test("GET /confirmUser/1 (wrong id)", async () => {
        const response = await supertest(baseURI).get(mockGetPath("confirmUser/1"));

        expect(response.body).toEqual({});
    });
});

describe("/home", () => {
    const getPath = getFullPath.bind(null, "home");
    const mockGetPath = jest.fn(getPath);
    
    test("POST /email (email was registred)", async () => {
        const testData = {
            email: "qwerty@gmail.com"
        };

        const response = await supertest(baseURI)
        .post(mockGetPath("email"))
        .send(testData)
        .set("Contect-Type", "application/json")
        .set("Accept", "application/json");

        expect(response.body?.status).toBe("success");
        expect(response.body?.message).toBe("This email needs verification");
    });

    test("GET /confirmEmail/1 (id doesn`t exist", async () => {
        const response = await supertest(baseURI)
        .get(mockGetPath("confirmEmail/1"));

        expect(response.body).toEqual({});
    });
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
});