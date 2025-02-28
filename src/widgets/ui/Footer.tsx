import React from "react";
import Image from "next/image";
import AhaIcon from "./AhaIcon";

export default function Footer() {
  return (
    <footer className="bg-main100 hidden md:block bg-no-repeat bg-center bg-cover pt-[10px] pb-[9px] bottom-0 left-0 right-0">
      <div className="container mx-auto w-full max-w-[1024px] px-[16px] lg:px-0">
        <h1 className="text-[20px] font-bold">
          <a href="/">
            <Image
              alt="아하 로고"
              loading="lazy"
              width="110"
              height="42"
              decoding="async"
              data-nimg="1"
              src="/logos/AHA.png"
            />
          </a>
        </h1>
        <div className="flex justify-between items-end">
          <nav>
            <ul className="flex items-center gap-3 font-medium text-[16px] text-gray-3">
              {/* <li>
                  <a href="/mustpost">메뉴1</a>
                </li>
                <li>|</li>
                <li>
                  <a href="/grouppost">메뉴2</a>
                </li> */}
            </ul>
          </nav>
          <div className="flex flex-col justify-end">
            <ul className="flex items-center justify-end text-[16px] gap-1">
              <li>
                <a
                  href="https://github.com/Subeen2/aha"
                  target="_blank"
                  title="깃헙으로 이동"
                >
                  <AhaIcon iconSrc={"/icons/git.svg"} width={20} />
                </a>
              </li>
            </ul>
            <p className="mt-[10px] text-gray-3 text-[14px]">Copyright©AHA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
