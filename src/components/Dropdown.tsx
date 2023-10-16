import React, { Fragment, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { Listbox, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

type Props = {
  options: string[];
  value: string;
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ options, value, placeholder, className, name, onChange }) => {
  
  return (
      <Listbox as="div" value={value} className={twMerge("relative w-full", className)} onChange={onChange} name={name} >
        {({ open }) => (
          <>
            {placeholder && <Listbox.Label className={"text-gray-500 capitalize pl-1 pb-2"}>{placeholder + ":"}</Listbox.Label>}
            
            {/* Dropdown button */}
            <Listbox.Button type='button' className={twMerge("backdrop:bg-white flex justify-between items-center shadow-[1px_2px_8px_#ddd] text-gray-800 px-4 py-2 pt-3 w-full rounded-md capitalize border border-gray-300 hover:border-gray-400 focus:border-gray-600 focus:shadow-none", open && "border-gray-600 shadow-none")} >
              <span>{value}</span>
              <MdArrowDropDown size={24} />
            </Listbox.Button>

            {/* Listbox items */}
            <Transition
              as={Fragment}
              show={open}
              enter="transform transition-all duration-200 ease-in"
              enterFrom='opacity-0 scale-95 h-0'
              enterTo='opacity-100 scale-100 h-auto'
              leave="transition-all duration-75 ease-out"
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-0'
            >
              <Listbox.Options as="div" className="absolute left-0 top-45 w-[calc(100%-5px)] z-50 flex flex-col justify-center items-center gap-1 bg-white rounded-md px-2 py-4 mt-1 ml-[2.25px] shadow-[0px_3px_8px_#bbb] text-gray-500"
                static>
                {
                  options.map((option, optionId) => <Listbox.Option as={Fragment} key={optionId} value={option}>
                    {
                      ({ active }) => <span
                        className={twMerge("w-full p-2 rounded-sm capitalize", active && "bg-gray-200")}
                        >
                          {option}
                        </span>
                    }
                  </Listbox.Option>)
                }
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
  )
}

export default Dropdown