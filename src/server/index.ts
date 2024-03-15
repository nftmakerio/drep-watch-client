import { FILTER_TYPES } from "~/constants";
import { BASE_API_URL } from "~/data/api";
import { Answer, Drep, Question } from "~/types";

async function getDreps(): Promise<{
    dreps: Drep[];
    questionAnswers: false;
}> {
    const res = await fetch(
        `${BASE_API_URL}/api/v1/drep`,
    );
    const dreps = (await res.json()) as Drep[];
    // console.log("GET DREPS CALLED")
    return { dreps, questionAnswers: false }
}
async function getLatestQuestions(): Promise<{
    answers: (Answer | undefined)[], questionAnswers: true, questions: Question[]
}> {
    const res = await fetch(
        `${BASE_API_URL}/api/v1/questions/latest`,
    );
    const resJson = (await res.json()) as { questions: Question[] };
    // console.log(resJson.questions)
    const questionIds = await Promise.all(resJson.questions.map((question) => fetch(`${BASE_API_URL}/api/v1/answers/${question.id}`)));
    const answers = await Promise.all(questionIds.map((questionId) => questionId.json())) as { answer?: Answer }[];
    
    console.log(answers)
    // console.log("GET LATEST QUESTIONS CALLED")
    return { answers: answers.map(el => el.answer), questionAnswers: true, questions: resJson.questions }
}
async function getLatestAnswers(): Promise<{
    answers: Answer[], questionAnswers: true, questions: Question[]
}> {
    const res = await fetch(
        `${BASE_API_URL}/api/v1/answers?latest=true`,
    );
    const resJson = (await res.json()) as { answers: Answer[] };
    // console.log(resJson.answers)
    const questionsRes = await Promise.all(resJson.answers.map((ans) => fetch(`${BASE_API_URL}/api/v1/questions/${ans.question_id}`)));
    const questions = await Promise.all(questionsRes.map((el) => el.json())) as { question: Question }[];
    // console.log("GET LATEST ANSWERS CALLED")
    return { answers: resJson.answers, questionAnswers: true, questions: questions.map(el => el.question) }
}

async function getData(activeNum: number) {
    if (activeNum === FILTER_TYPES.LATEST_QUESTIONS)
        return getLatestQuestions();
    else if (activeNum === FILTER_TYPES.EXPLORE_DREPS)
        return getDreps();
    else
        return getLatestAnswers();
}

export {
    getDreps,
    getLatestQuestions,
    getLatestAnswers,
    getData
}