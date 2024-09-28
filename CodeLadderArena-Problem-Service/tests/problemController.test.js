const problemController = require('../src/controllers/problem.controller');
const NotFound = require('../src/errors/notfound.error');
const problemService = require('../src/services/problem.service');
const { StatusCodes } = require("http-status-codes");


// we are not sending actual req so using MOCK 
jest.mock('../src/services/problem.service');


describe("Problem Controller Unit Tests", () => {

    beforeEach(() => {
        //console.log("called after all testes");
        req = {};
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe("Should get All Problems", () => {
        test("Should return data when status code is ok", async () => {
            const problems = [];

            // problemService -> 
            problemService.prototype.getAllProblems.mockResolvedValue(problems);

            await problemController.getProblems(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(problemService.prototype.getAllProblems).toHaveBeenCalledTimes(1);
            expect(next).not.toHaveBeenCalled();
        })
    })

    describe("Should get the Problem", () => {
        test("Should call next with error if service throws error", async () => {
            const mockError = new NotFound('id', 10);
            problemService.prototype.getProblem.mockRejectedValue(mockError);
            req.params = { id: 10 };
            await problemController.getProblem(req, res, next);

            expect(next).toHaveBeenCalledWith(mockError)
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });
})
