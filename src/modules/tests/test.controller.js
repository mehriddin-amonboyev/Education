import { Test } from "./test.model.js";

class TestController {
    #_testModel

    constructor() {
        this.#_testModel = Test
    }

    // CREATE: Yangi test qo'shish
    createTest = async (req, res) => {
        try {
            // const newTest = new Test(req.body);
            await this.#_testModel.create({
                ...req.body,
            });
            console.log(req.body)
            res.status(201).send({
                message: "Test muvaffaqiyatli qo'shildi",
            });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    };

    // READ: Barcha testlarni olish
    getAllTests = async (req, res) => {
        try {
            const tests = await this.#_testModel.find();
            res.status(200).send({
                message: "Success",
                data: tests
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // READ: ID bo'yicha testni olish
    getTestById = async (req, res) => {
        try {
            const test = await this.#_testModel.findById(req.params.id); // Use req.params.id

            if (test) {
                res.status(200).send({
                    message: "Success",
                    data: test
                });
            } else {
                return res.status(404).send({ error: "Test not found" });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    // UPDATE: ID bo'yicha testni yangilash
    updateTest = async (req, res) => {
        try {
            const updatedTest = await this.#_testModel.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });

            if (!updatedTest) return res.status(404).send({ error: "Test topilmadi" });
            res.status(200).send(updatedTest);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    // DELETE: ID bo'yicha testni o'chirish
    deleteTest = async (req, res) => {
        try {
            const deletedTest = await this.#_testModel.findByIdAndDelete(req.params.id);

            if (!deletedTest) return res.status(404).send({ error: "Test topilmadi" });

            res.status(200).send({ message: "Test muvaffaqiyatli o'chirildi" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default new TestController();