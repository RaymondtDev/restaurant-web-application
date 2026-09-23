import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import clsx from 'clsx';
import { FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdRefresh, MdTableBar } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSwipeable } from 'react-swipeable';

import TA1 from '../assets/table-a1.svg';
import TA2 from '../assets/table-a2.svg';
import TA3 from '../assets/table-a3.svg';
import TB1 from '../assets/table-b1.svg';
import TB2 from '../assets/table-b2.svg';
import TB3 from '../assets/table-b3.svg';
import { RxCross2 } from 'react-icons/rx';

interface TableObject {
  image?: string;
  name: string;
  seats: number;
}

interface UserData {
  name: string,
  surname: string,
  email: string,
  phone: string,
  occasion?: string,
  specialRequest?: string
}

interface PropTypes {
  displayFunc: () => void
}

export default function ReservationForm({ displayFunc }: PropTypes) {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    occasion: '',
    specialRequest: ''
  })
  
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(new Date));
  const [step, setStep] = useState<number>(1);
  const [selectedTable, setSelectedTable] = useState<TableObject | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const tables: TableObject[] = [
    { image: TA1, name: "A1", seats: 2}, 
    { image: TA2, name: "A2", seats: 3}, 
    { image: TA3, name: "A3", seats: 4}, 
    { image: TB1, name: "B1", seats: 4}, 
    { image: TB2, name: "B2", seats: 6}, 
    { image: TB3, name: "B3", seats: 8}
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextStep(),
    onSwipedRight: () => handlePreviousStep(),
    trackMouse: true
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleScroll: () => void = () => {
      if (containerRef.current) {
        if (containerRef.current.scrollTop > 20) 
          setIsScrolled(true);
        else 
          setIsScrolled(false);
      }
    };

    const div = containerRef.current;

    if (div) div.addEventListener('scroll', handleScroll);
    return () => {
      if (div) div.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div {...handlers} className="relative size-full md:size-19/20 bg-white pb-2 md:p-2.5 lg:p-5 rounded-lg shadow-xl flex flex-col justify-between lg:px-10 xl:px-50 overflow-y-auto scrollbar-none z-20" ref={containerRef}>
      {/* close form button */}
      <div className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer" onClick={displayFunc}>
        <RxCross2 size={25} />
      </div>

      {/* steps navigation header */}
      <div className={
        clsx(
          "sticky mt-12 md:mt-0 md:static flex items-start p-2 z-10 md:shadow-none md:px-5 lg:px-10 top-0 w-full bg-white",
          {
            "shadow-md": isScrolled
          }
        )
        }>
        <div className="flex items-center flex-1 last:flex-initial">
          <div className="flex flex-col items-center">
            <div className={
              clsx(
                "size-8 shrink-0 rounded-full flex items-center justify-center text-sm font-medium",
                {
                  "bg-charcoal-800 text-white": step >= 1,
                }
              )
            }>
              {step > 1 ? <FaCheck /> : 1 }
            </div>
            <span className="mt-2 text-xs font-medium text-gray-700 whitespace-nowrap">Personal Details</span>
          </div>

          {/* connector segment between this step and the next */}
          <div className="relative flex-1 h-1 mx-2 -mt-5 rounded-full bg-gray-200 overflow-hidden">
            <div className={
              clsx(
                "absolute inset-y-0 left-0 rounded-full bg-charcoal-700 transition-all duration-500 ease-out",
                {
                  "w-full": step > 1,
                  "w-0": step === 1
                }
              )
            } />
          </div>
        </div>

        <div className="flex items-center flex-1 last:flex-initial">
          <div className="flex flex-col items-center">
            <div className={
              clsx(
                "size-8 shrink-0 rounded-full flex items-center justify-center text-sm font-medium",
                {
                  "bg-charcoal-800 text-white": step >= 2,
                  "bg-charcoal-200/50 text-white": step < 2
                }
              )
            }>
              {step > 2 ? <FaCheck /> : 2 }
            </div>
            <span className="mt-2 text-xs font-medium text-charcoal-700 whitespace-nowrap">Date and Table</span>
          </div>

          {/* connector segment between this step and the next */}
          <div className="relative flex-1 h-1 mx-2 -mt-5 rounded-full bg-gray-200 overflow-hidden">
            <div className={
              clsx(
                "absolute inset-y-0 left-0 rounded-full bg-gray-700 transition-all duration-500 ease-out",
                {
                  "w-full": step > 2,
                  "w-0": step <= 2
                }
              )
            } />
          </div>
        </div>

        <div className="flex items-center flex-1 last:flex-initial">
          <div className="flex flex-col items-center">
            <div className={
              clsx(
                "size-8 shrink-0 rounded-full flex items-center justify-center text-sm font-medium",
              {
                "bg-charcoal-800 text-white": step === 3,
                "bg-charcoal-200/50 text-white": step < 3
              }
              )
            }>
              {step === 3 ? <FaCheck /> : 3 }
            </div>
            <span className="mt-2 text-xs font-medium text-charcoal-700 whitespace-nowrap">Review and Confirm</span>
          </div>
        </div>
      </div>
      
      {/* form container */}
      <div className="md:min-h-0 md:h-full flex-1 my-4 px-2 md:px-5 lg:px-10">
        { step === 1 && <div className="flex flex-col h-full md:min-h-0">
          <div>
            <div className="flex flex-col gap-2 mb-3">
              <input type="text" name="name" id="name" placeholder="Enter your name..." ref={inputRef} onChange={handleChange} value={userData.name} required />
              <input type="text" name="surname" id="surname" placeholder="Enter your surname..." onChange={handleChange} value={userData.surname} required />
            </div>
            <div className="flex flex-col md:flex-row gap-2 mb-3">
              <input type="email" name="email" id="email" placeholder="Enter your email..." onChange={handleChange} value={userData.email} required />
              <input type="tel" name="phone" id="phone" placeholder="Enter your phone number..." onChange={handleChange} value={userData.phone} required />
            </div>
          </div>
          <select name="occasion" id="occasion" className="w-full mb-3" onChange={handleChange} value={userData.occasion}>
            <option value="">Select an occasion... (Optional)</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Business Meeting">Business Meeting</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="specialRequest" id="specialRequest" placeholder="Any special requests? (Optional)" className="flex-1" rows={6} onChange={handleChange} value={userData.specialRequest} ></textarea>
        </div> }

        { step === 2 && <div className="md:min-h-0 md:h-full flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-0 h-full flex-1">
            <div className="flex flex-col gap-2 min-h-0 h-full">
              <div className="mb-2">
                <p className="mb-1">Pick a Date <span className='text-red-600'>*</span></p>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedDate}
                      onChange={(newVal) => setSelectedDate(newVal)}
                      slotProps={{
                        // style border radius
                        textField: {
                          sx: {
                            '& .MuiPickersOutlinedInput-root': {
                              borderRadius: '15px',
                              width: '100%',
                              '& fieldset': { borderWidth: '2px' }
                            }
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <p className="mb-1">Pick a Table <span className='text-red-600'>*</span></p>
              <div className="grid grid-cols-2 lg:grid-cols-3 min-h-0 h-full flex-1 gap-2 p-2 bg-charcoal-100/20 rounded-md overflow-y-auto md:scrollbar-none">
                {tables.map((table) => (
                  <div key={table.name} className={
                    clsx(
                      "p-2 bg-white shadow-md rounded-md cursor-pointer transition hover:scale-105 flex flex-col",
                      {
                        "border-2 border-charcoal-800": selectedTable?.name === table.name,
                        "border-2 border-transparent": selectedTable?.name !== table.name
                      }
                    )
                  } onClick={() => setSelectedTable(table)}>
                    <div className="flex items-center mb-3 py-1 rounded-md border border-charcoal-400 w-fit divide-x divide-charcoal-300/20">
                      <p className="flex items-center gap-1 uppercase text-sm py-0.5 px-1"><MdTableBar />{table.name}</p>
                      <p className="flex items-center gap-1 uppercase text-sm py-0.5 px-1"><IoPeople />{table.seats}</p>
                    </div>
                    <figure className="flex-1 flex items-center justify-center">
                      <img src={table.image} alt='table type image' />
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="mb-1">Pick a Time</p>
              <div className="bg-charcoal-800 rounded-xl p-2 flex-1">
                <div className="flex items-center justify-center h-full py-8">
                  <button className={
                    clsx(
                      "text-black bg-white rounded-full p-4 flex items-center justify-center cursor-pointer transition hover:scale-110 animation-pulse"
                    )
                  }>
                    <MdRefresh size={25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> }

        { step === 3 && <div>
          
        </div> }
      </div>

      <div className={
        clsx(
          "fixed w-full bottom-0 md:static flex px-2 md:px-5 lg:px-10 justify-between"
        )
        }>
          <button className={
              clsx(
                "p-4 rounded-full cursor-pointer text-white transition hover:scale-110 border-2 border-white",
                {
                  "bg-charcoal-300 pointer-events-none": step <= 1,
                  "bg-charcoal-800": step > 1
                }
              )
            }
            onClick={handlePreviousStep}
          >
            <FaArrowLeft />
          </button>
          <button className={
              clsx(
                "p-4 rounded-full cursor-pointer text-white transition hover:scale-110 border-2 border-white",
                {
                  "bg-charcoal-300 pointer-events-none": step >= 3,
                  "bg-charcoal-800": step < 3
                }
              )
            }
            onClick={handleNextStep}
          >
            <FaArrowRight />
          </button>
        </div>
    </div>
  )
}