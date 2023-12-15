// @deno-types="npm:@types/express@4"
import {Request, Response} from "express"
import { Subject } from "../types.ts";
import { SubjectModel } from "../db/subject.ts";
import { getSubjectFromModel } from "../controllers/getSubjectFromModel.ts";

export const getSubjects = async(req: Request<{id:string},{},{}>,res:Response<Subject>) => {

    try{
        const subject = await SubjectModel.findById(id).exec()
        if(!subject){
             return res.status(404).json({error: "Subject not found"}).send();
             return;
        }
        const subjectResponse = await getSubjectFromModel(subject);
        res.status(200).json(subjectResponse).send();

    }catch(e){
        res.status(500).json(e).send();
    }

}