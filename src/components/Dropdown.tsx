import React, { Fragment, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Listbox, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type Props = {
  options: string[];
  value: string;
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: (value: string) => void;
};

const Dropdown: React.FC<Props> = ({
  options,
  value,
  placeholder,
  className,
  name,
  onChange,
}) => {
  return (
    <Listbox
      as="div"
      value={value}
      className={twMerge("relative w-full", className)}
      onChange={onChange}
      name={name}
    >
      {({ open }) => (
        <>
          {placeholder && (
            <Listbox.Label className="text-slate-700 capitalize ml-1">
              {placeholder + " :"}
            </Listbox.Label>
          )}

          {/* Dropdown button */}
          <Listbox.Button
            type="button"
            className={twMerge(
              "backdrop:bg-white flex justify-between items-center shadow-[1px_2px_8px_#ddd] text-slate-800 px-4 py-2 pt-3 mt-1 w-full rounded-md capitalize border border-slate-500 hover:border-slate-600 focus:border-slate-700 focus:shadow-none",
              open && "border-slate-600 shadow-none"
            )}
          >
            <span>{value || placeholder}</span>
            <MdArrowDropDown size={24} />
          </Listbox.Button>

          {/* Listbox items */}
          <Transition
            as={Fragment}
            show={open}
            enter="transform transition-all duration-200 ease-in"
            enterFrom="opacity-0 scale-95 h-0"
            enterTo="opacity-100 scale-100 h-auto"
            leave="transition-all duration-75 ease-out"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            <Listbox.Options
              as="div"
              className="absolute left-0 top-45 w-[calc(100%-5px)] z-50 flex flex-col justify-center items-center gap-1 bg-white rounded-md px-2 py-4 mt-1 ml-[2.25px] shadow-[0px_3px_8px_#bbb] text-slate-500"
              static
            >
              {options.map((option, optionId) => (
                <Listbox.Option as={Fragment} key={optionId} value={option}>
                  {({ active }) => (
                    <span
                      className={twMerge(
                        "w-full p-2 rounded-sm capitalize",
                        active && "bg-slate-200"
                      )}
                    >
                      {option}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default Dropdown;
