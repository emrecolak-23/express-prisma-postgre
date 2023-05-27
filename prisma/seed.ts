import { PrismaClient, Prisma } from '@prisma/client'
import { add } from "date-fns"
const prisma = new PrismaClient()


async function main() {
  await prisma.courseEnrollment.deleteMany({})
  await prisma.testResult.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.test.deleteMany({})
  await prisma.course.deleteMany({})
  const emre = await prisma.user.create({
    data: {
      email: 'colakkemre@gmail.com',
      firstname: "Emre",
      lastName: "Çolak",
      social: {
        facebook: "colakkemre",
        instagram: "colakkemre"
      }
    }
  })
  // console.log(user)

  const weekFromNow = add(new Date(), { days: 7 })
  const twoWeekFromNow = add(new Date(), { days: 14 })
  const monthFromNow = add(new Date(), { days: 28 })

  const course = await prisma.course.create({
    data: {
      name: 'Javascript BootCamp',
      tests: {
        create: [
          {
            date: weekFromNow,
            name: 'First Test'
          },
          {
            date: twoWeekFromNow,
            name: 'Second Test'
          },
          {
            date: monthFromNow,
            name: 'Final Exam'
          }
        ]
      },
      members: {
        create: {
          role: 'TEACHER',
          user: {
            connect: { email: emre.email }
          }
        }
      }
    },
    include: {
      tests: true,
      members: { include: { user: true } }
    }
  })

  console.log(course)

  const shakuntala = await prisma.user.create({
    data: {
      email: 'devi@prisma.io',
      firstname: 'Shakuntala',
      lastName: 'Devi',
      social: {
        twitter: 'dev1'
      },
      courses: {
        create: {
          role: 'STUDENT',
          course: {
            connect: { id: course.id },
          },
        },
      },
    },
  })

  const david = await prisma.user.create({
    data: {
      email: 'david@prisma.io',
      firstname: 'David',
      lastName: 'Deutsch',
      social: {
        twitter: 'david'
      },
      courses: {
        create: {
          role: 'STUDENT',
          course: {
            connect: { id: course.id },
          },
        },
      },
    },
  })

  const testResults = [70, 50, 90]
  let counter = 0

  for (const test of course.tests) {
    const shakuntalaTestResult = await prisma.testResult.create({
      data: {
        graderBy: { connect: { email: emre.email } },
        student: { connect: { email: shakuntala.email } },
        test: { connect: { id: test.id } },
        result: testResults[counter]
      }
    })

    counter++
  }

  const results = await prisma.testResult.aggregate({
    where: { studentId: shakuntala.id },
    _avg: { result: true },
    _max: { result: true },
    _min: { result: true },
    _count: true
  })

  console.log(results)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
