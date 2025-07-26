import { Calendar, type Event } from 'react-big-calendar';
import type { Task } from '../types/Task';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { type View, Views } from 'react-big-calendar';

// Configure date-fns localizer for react-big-calendar
const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales,
});



interface TaskCalendarProps {
    tasks: Task[];
}

/**
* TaskCalendar displays task due dates on a calendar view using react-big-calendar
*/
function TaskCalendar({ tasks }: TaskCalendarProps) {
    //Add state for view and date
    const [view, setView] = useState<View>(Views.MONTH); //'month', 'week', etc.
    const [date, setDate] = useState(new Date());

    //Convert tasks to calendar events
    const events: Event[] = useMemo(
        () =>
            tasks.map((task) => ({
                title: task.title,
                start: new Date(task.dueDate),
                end: new Date(task.dueDate),
                allDay: true,
            })),
        [tasks]
    );

    return (
        <div style={{ height: '500px' }} className='my-4'>
            <h4 className='mb-3 fw-bold'>Task Calendar</h4>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '500' }}
                view={view}
                onView={(newView) => setView(newView)}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}

            />
        </div>
    );
}

export default TaskCalendar;