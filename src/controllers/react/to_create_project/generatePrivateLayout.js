import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';



export const generatePrivateLayout = async (fullPath) => {
  await createSessionLayout(fullPath);
}



export const createSessionLayout = async (fullPath) => {
  const layoutsDir = path.join(fullPath, 'src', 'layouts', 'private');
  const filePath   = path.join(layoutsDir, 'SessionLayout.jsx');

  createFolder(layoutsDir);

  const content = `"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import Logo from "../../assets/images/logo.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SessionLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, displayName } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  };

  const onProfile = (e) => {
    e.preventDefault();
    navigate("/admin/profile");
  };

  const navigation = [
    {
      name: t("dashboard"),
      href: "/admin/dashboard",
      icon: HomeIcon,
      current: true,
    },
    { name: t("teams"), href: "/admin/teams", icon: UsersIcon, current: false },
    {
      name: t("settings"),
      icon: CogIcon,
      current: false,
      children: [
        { name: t("menu_a"), href: "/admin/dashboard" },
        { name: t("menu_a"), href: "/admin/teams" },
      ],
    },
  ];

  const userNavigation = [
    { name: t("profile"), onClick: onProfile },
    { name: t("logout"), onClick: onLogout },
  ];

  const updatedNavigation = navigation.map((item) => {
    const isCurrent =
      location.pathname.startsWith(item.href) ||
      (item.children &&
        item.children.some((child) =>
          location.pathname.startsWith(child.href)
        ));

    return {
      ...item,
      current: isCurrent,
    };
  });

  const setChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt={import.meta.env.VITE_APP_NAME}
                  src={Logo}
                  className="h-8 w-auto"
                />
                <span className="text-white text-2xl ml-3 font-bold">
                  {import.meta.env.VITE_APP_NAME}
                </span>
              </div>

              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {updatedNavigation.map((item, index) => (
                        <li key={index}>
                          {item.children ? (
                            <details className="group" open={item.current}>
                              <summary className="flex items-center justify-between cursor-pointer rounded-md p-2 text-sm font-semibold text-gray-200 hover:bg-gray-300/80 hover:text-white">
                                <div className="flex items-center gap-x-3">
                                  <item.icon className="size-6 shrink-0" />
                                  {item.name}
                                </div>
                                <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
                              </summary>
                              <ul className="ml-6 mt-1 space-y-1">
                                {item.children.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <NavLink
                                      to={subItem.href}
                                      className={({ isActive }) =>
                                        classNames(
                                          isActive
                                            ? "bg-primary-dark text-white"
                                            : "text-gray-300 hover:bg-gray-300/80 hover:text-white",
                                          "block rounded-md px-2 py-1 text-sm"
                                        )
                                      }
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <NavLink
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-primary-dark text-white"
                                  : "text-gray-200 hover:bg-gray-300/80 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                              )}
                            >
                              <item.icon className="size-6 shrink-0" />
                              {item.name}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img alt={import.meta.env.VITE_APP_NAME} src={Logo} className="h-8 w-auto" />
            <span className="text-white text-2xl ml-3 font-bold">
              {import.meta.env.VITE_APP_NAME}
            </span>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {updatedNavigation.map((item, index) => (
                    <li key={index}>
                      {item.children ? (
                        <details className="group" open={item.current}>
                          <summary className="flex items-center justify-between cursor-pointer rounded-md p-2 text-sm font-semibold text-gray-200 hover:bg-gray-300/80 hover:text-white">
                            <div className="flex items-center gap-x-3">
                              <item.icon className="size-6 shrink-0" />
                              {item.name}
                            </div>
                            <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
                          </summary>
                          <ul className="ml-6 mt-1 space-y-1">
                            {item.children.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavLink
                                  to={subItem.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive
                                        ? "bg-primary-dark text-white"
                                        : "text-gray-300 hover:bg-gray-300/80 hover:text-white",
                                      "block rounded-md px-2 py-1 text-sm"
                                    )
                                  }
                                >
                                  {subItem.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <NavLink
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-primary-dark text-white"
                              : "text-gray-200 hover:bg-gray-300/80 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                          )}
                        >
                          <item.icon className="size-6 shrink-0" />
                          {item.name}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="size-6" />
          </button>

          <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="grid flex-1 grid-cols-1 mt-5">
              <div>
                <h2 style={{ color: 'red' }}>{status}</h2>
              </div>
            </div>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="size-6" />
              </button>

              <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

              <select
                id="location"
                name="location"
                value={i18n.language}
                onChange={setChangeLanguage}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="es">{t('languages.es')}</option>
                <option value="en">{t('languages.en')}</option>
              </select>

              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5 mr-5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-gray-50"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm/6 font-semibold text-gray-900">{displayName}</span>
                    <ChevronDownIcon className="ml-2 size-5 text-gray-400" />
                  </span>
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition data-closed:scale-95 data-closed:opacity-0"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <button
                        onClick={item.onClick}
                        className="block w-full text-left px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50"
                      >
                        {item.name}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn animate__faster">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
`;

  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`✅ Archivo creado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al crear el archivo ${filePath}: ${error}`);
  }
};



