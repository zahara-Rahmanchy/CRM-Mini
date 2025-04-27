import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {ReminderFormType, ReminderSchema } from "../../utils/SchemaValidation/reminderValidation";

const ReminderForm = () => {
      const { register, handleSubmit, formState: { errors } } = useForm<ReminderFormType>({
        resolver: zodResolver(ReminderSchema), // Use Zod for form validation
      });
      const [loading,setLoading] = useState(false);
      const onSubmit = (formData: {email: string; date: Date , note:string}) => {
        setLoading(true)
        // mutate(formData);
      };

return (
    <section className="mb-5">

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="email"
            {...register('email')}
            placeholder="Client Email Address"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="date"
            placeholder="Date"
            {...register('date')}
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="textarea"
            placeholder="Note"
            {...register('note')}
          />
          {errors.note && <span className="text-red-500 text-sm">{errors.note.message}</span>}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg mt-2 transition"
          >
            Save
          </button>
        </form>
    </section>
  )
}

export default ReminderForm