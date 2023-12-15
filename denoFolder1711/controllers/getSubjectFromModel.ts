import { StudentModel } from "../db/student.ts";
import { SubjectSchemaType } from "../db/subject.ts";
import { TeacherModel } from "../db/teacher.ts";
import { Subject } from "../types.ts";


export const getSubjectFromModel = async (
    subject: SubjectSchemaType,
): Promise<Subject> => {

    const teacher = await TeacherModel.findById(subject?.teacherID)
    const students = await StudentModel.find({
        _id: {$in: subject?.studentIds}
    })

    const subjectResponse = {
        id: subject.id,
        name: subject.name,
        year: subject.year,
        teacher: {
            id: teacher!.id,
            name: teacher!.name,
            email: teacher!.email,
        },
        students: students.map(st => ({
            id: st.id,
            name: st.name,
            email: st.email,
        })),
    }
    return subjectResponse
}