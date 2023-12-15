import mongoose from "mongoose"
import { TeacherModel }  from "./teacher.ts";
import { StudentModel } from "./student.ts";
import { Subject } from "../types.ts";

const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    name: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    teacherID: {type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true},
    studentIds: [{type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, default: []}],
},{
 timestamps: true
})

SubjectSchema.path("year").validate((year) => {
    if(year < 1 || year > 4) return false;
    return true;
}) ;

SubjectSchema.path("teacherID").validate(async (teacherID: mongoose.Types.ObjectId) => {
    try{
    const teacher = await TeacherModel.findById(teacherID);
    if(!teacher) return false;
    return true;
    } catch(e){
        return false;
    }
})

SubjectSchema.path("studentIds").validate(async (studentIds: mongoose.Types.ObjectId[]) => {
    try{
        const students = await StudentModel.find({_id: {$in: studentIds}});
        if(students.length !== studentIds.length) return false;
        return true;
    } catch(e){
        return false;
    }
})

export type SubjectSchemaType = mongoose.Document & 
    Omit<Subject, "id" | "teacher" | "students"> & {
        teacherID: mongoose.Types.ObjectId,
        studentIds: mongoose.Types.ObjectId[],
    }

export const SubjectModel = mongoose.model<SubjectSchemaType>("Subject", SubjectSchema)