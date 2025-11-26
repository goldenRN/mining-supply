

"use client";
import {
    MailIcon,
    PhoneIcon,
    MapPinIcon,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo_v from "/img/ms_logo_white.png";

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-blue-50 w-full pt-10" style={{ fontFamily: 'RobotoBold' }}>
            {/* --- Дээд хэсэг: Logo ба танилцуулга --- */}
            <div className="flex flex-col items-center text-center">
                {/* <Image
                    src={logo_v}
                    width={160}
                    height={160}
                    alt="AgroCity Logo"
                    className="rounded-xl"
                /> */}
                <div className="flex space-x-5 mb-4 md:mb-0 mt-5">
                    {[
                        { Icon: Facebook, color: "hover:text-blue-400", link: "https://www.facebook.com/profile.php?id=61554999943387" },
                        { Icon: Linkedin, color: "hover:text-blue-500", link: "" },
                        { Icon: Instagram, color: "hover:text-pink-400", link: "" },
                        { Icon: Youtube, color: "hover:text-red-500", link: "outube.com/watch?v=-ByuEAbeTgA" },
                    ].map(({ Icon, color, link }, i) => (
                        <a
                            key={i}
                            href={link}
                            className={`${color} transition-transform transform hover:scale-125 duration-200`}
                        >
                            <Icon size={22} />
                        </a>
                    ))}
                </div>
                {/* <p className="text-lg md:text-md max-w-2xl text-white leading-relaxed" style={{ fontFamily: 'RobotoRegular' }}>
          Ухаалаг хөдөө аж ахуйн дижитал экосистем. 
          Инновац, өгөгдөлд суурилсан шийдвэр, тогтвортой хөгжил.
        </p> */}
            </div>

            {/* --- Дунд хэсэг: 3 багана --- */}
            <section className=" grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
                <div className="p-6 text-right">
                    <h3
                        className="text-lg text-amber-300 mb-2"
                        style={{ fontFamily: 'RobotoBold' }}
                    >
                        Холбоо барих
                    </h3>

                    <ul className="space-y-3 text-white text-right">
                        <li className="flex justify-end items-center gap-2">
                            <MailIcon size={18} className="text-blue-300" />
                            <a
                                href="mailto:agrocity@ub.gov.mn"
                                className="hover:text-white transition-colors duration-200"
                                style={{ fontFamily: 'RobotoBold' }}
                            >
                                sales@urnukhbarilga.com
                            </a>
                        </li>

                        <li className="flex justify-end items-center gap-2">
                            <PhoneIcon size={18} className="text-blue-300" />
                            <a
                                href="tel:+9760000000"
                                className="hover:text-white transition-colors duration-200"
                            >
                                +976 60303468
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="p-6  text-center">
                    <h3 className="text-lg font-roboto-bold text-amber-300 mb-2" style={{ fontFamily: 'RobotoBold' }}>Хаяг байрлал</h3>
                    <ul className="space-y-3 text-white items-center text-center ">
                        <li className="flex justify-center md:justify-center items-center gap-2">
                            <MapPinIcon size={18} className="text-blue-300" />
                            <span style={{ fontFamily: 'RobotoBold' }}>Улаанбаатар хот, Монгол улс</span>
                        </li>
                        <li style={{ fontFamily: 'RobotoBold' }}>Дүүрэг бар тоот</li>
                    </ul>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-roboto-bold text-amber-300 mb-2" style={{ fontFamily: 'RobotoBold' }}>Холбоосууд</h3>
                    <ul className="text-base text-white list-disc list-inside space-y-1" style={{ fontFamily: 'RobotoRegular' }}>
                        <li >
                            <Link href="https://urnukhbarilga.com/about-us" className="hover:text-amber-400 transition" style={{ fontFamily: 'RobotoBold' }}>
                                Бидний тухай
                            </Link>
                        </li>
                        <li>
                            <Link href="https://urnukhbarilga.com/products-lists" className="hover:text-amber-400 transition" style={{ fontFamily: 'RobotoBold' }}>
                                Үйлчилгээ
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/law" className="hover:text-amber-400 transition" style={{ fontFamily: 'RobotoBold' }}>
                                Хууль, эрх зүй
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/privacy" className="hover:text-amber-400 transition" style={{ fontFamily: 'RobotoBold' }}>
                                Нууцлалын бодлого
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>


            {/* --- Доод хэсэг: Зохиогчийн эрх ба соц холбоос --- */}
            <div className="border-t border-blue-700 pt-6 pb-6 px-6 justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">



                    {/* Хуулийн хэсэг */}
                    <div className="text-center md:text-center text-sm text-blue-200">
                        <p style={{ fontFamily: 'RobotoBold' }}>
                            © 2025{" "}
                            <span className="text-amber-400 font-semibold" >Mining Supplies</span>. Бүх
                            эрх хуулиар хамгаалагдсан.
                        </p>
                        {/* <p className="text-blue-300 mt-1" style={{ fontFamily: 'RobotoBold' }}>
                            Website designed by{" "}
                            <span className="text-amber-300 font-semibold hover:underline">
                                Binarysoft LLC
                            </span>
                        </p> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
