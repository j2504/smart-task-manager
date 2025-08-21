import { Calendar, type Event } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { dateFnsLocalizer } from 'react-big-calendar';
import { enUS } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { type View, Views } from 'react-big-calendar';
import { useTasks } from "../context/TaskContext";

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

/**
* TaskCalendar displays task due dates on a calendar view using react-big-calendar
*/
function TaskCalendar() {
    const { tasks } = useTasks();
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
                resource: { status: task.status }, //Pass status to style
            })),
        [tasks]
    );

    /**
    *  Apply dynamic styling to events based on status (pending, in-progress, completed)
    */
    const eventStyleGetter = (event: Event) => {
        const status = event.resource?.status || 'pending';

        let backgroundColor = '';
        switch (status) {
            case 'completed':
                backgroundColor = '#198754'; // Bootstrap green
                break;
            case 'in-progress':
                backgroundColor = '#0d6efd'; // Bootstrap blue
                break;
            case 'pending':
            default:
                backgroundColor = '#6c757d'; // Bootstrap gray
                break;
        }

        return {
            style: {
                backgroundColor,
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                padding: '2px 6px',
            },
        };
    };

    return (
        <div style={{ height: '500px' }} className='my-4'>
            <h4 className='mb-3 fw-bold'>Task Calendar</h4>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '500' }}
                eventPropGetter={eventStyleGetter}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}

            />
        </div>
    );
}

export default TaskCalendar;