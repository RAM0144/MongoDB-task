//1. Find all the topics and tasks which are thought in the month of October
db.topics.find({ date: { $regex: "2023-10" } });

db.tasks.find({ date: { $regex: "2023-10" } });

//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.companydrives.find({ date: { $gte: "15", $lte: "31" } });

//3.Find all the company drives and students who are appeared for the placement.

const drives = db.companydrives.find({}).toArray();
const emails = [];
drives.forEach((o) => o.students.forEach((e) => emails.push(e)));
const appeardStudents = db.users.find({ email: { $in: emails } });

//4.Find the number of problems solved by the user in codekata

db.codekata.aggregate([
    {
        $match: {
            solved: 1,
        },
    },

    {
        $group: {
            _id: "$name",
            number_of_problems_solved: {
                $sum: "$solved",
            }
        },
    },

    {
        $project: {
            _id: 0,
            name: "$_id",
            number_of_problems_solved: 1,
        },
    },
]);

//5.Find all the mentors with who has the mentee's count more than 15
db.mentors.find({mentees:{$gt:15}}).count();

//6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.users.find({ task: { $regex: "NotSubmitted"} });