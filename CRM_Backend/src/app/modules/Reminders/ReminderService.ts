import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../Errors/ApiError";
import { startOfWeek, endOfWeek, format } from 'date-fns';
export interface IReminderData {
  email: string 
  date: Date,
  message: string
}
const addReminderIntoDB = async (data: IReminderData, id: string) => {
    console.log("data: ", data, "\n", "id:", id);
    const {email,date,message} = data
    const isUserExists = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  
    if (!isUserExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exists!", "", "");
    }
    const client = await prisma.clients.findFirst({
      where: {
        userId: id,
        email,
      },
    });
  
    if (!client) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Client not found for this user!", "", "");
    }
    const result = await prisma.reminders.create({
      data: {
        userId:id,
        date,
        message,
        clientId: client.client_id,
        
      },
    });
    console.log({result});
    return result;
  };

  const getRemindersFromDB = async (userId: string) => {
    try {
      // Calculate the start and end dates of the current week
      const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Week starts on Monday
      const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  
      // Query reminders within the date range of the current week
      const reminders = await prisma.reminders.findMany({
        where: {
          userId,
          date: {
            gte: startOfWeekDate, // Greater than or equal to the start of the week
            lte: endOfWeekDate, // Less than or equal to the end of the week
          },
        },
      });
  
      // Check if there are any reminders due this week
      if (!reminders || reminders.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No reminders found for this week.', '', '');
      }
  
      // Format the date and message for each reminder and return the summary
      const remindersSummary = reminders.map((reminder) => ({
        message: reminder.message,
        date: format(new Date(reminder.date), 'yyyy-MM-dd'), // Format date in a readable format
      }));
  
      return remindersSummary;
    } catch (error:any) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message, '', '');
    }
  };
  
  

  export const ReminderServices={
    addReminderIntoDB,
    getRemindersFromDB
  }