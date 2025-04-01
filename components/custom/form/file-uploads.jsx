import { useState } from "react";
import { useController } from "react-hook-form";
import {
  AiOutlineFileWord,
  AiOutlineFileExcel,
  AiOutlineFilePdf,
} from "react-icons/ai";
import { useIntl } from "react-intl";

const MAX_FILES = 10;
const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const getFileIcon = (fileName) => {
  if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
    return (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M41.3885 8.33203H16.9435C16.0999 8.33203 15.416 9.01592 15.416 9.85954V16.6654L29.5827 20.832L42.916 16.6654V9.85954C42.916 9.01592 42.2321 8.33203 41.3885 8.33203Z"
          fill="#41A5EE"
        />
        <path
          d="M42.916 16.668H15.416V25.0013L29.5827 27.5013L42.916 25.0013V16.668Z"
          fill="#2B7CD3"
        />
        <path
          d="M15.416 25V33.3333L28.7493 35L42.916 33.3333V25H15.416Z"
          fill="#185ABD"
        />
        <path
          d="M16.9435 41.6654H41.3885C42.2322 41.6654 42.916 40.9815 42.916 40.1379V33.332H15.416V40.1379C15.416 40.9815 16.0999 41.6654 16.9435 41.6654Z"
          fill="#103F91"
        />
        <path
          opacity="0.1"
          d="M25.5552 15H15.416V35.8333H25.5552C26.3977 35.8306 27.0799 35.1483 27.0827 34.3058V16.5275C27.0799 15.685 26.3977 15.0027 25.5552 15Z"
          fill="black"
        />
        <path
          opacity="0.2"
          d="M24.7218 15.834H15.416V36.6673H24.7218C25.5643 36.6646 26.2466 35.9823 26.2493 35.1398V17.3615C26.2466 16.519 25.5643 15.8367 24.7218 15.834Z"
          fill="black"
        />
        <path
          opacity="0.2"
          d="M24.7218 15.834H15.416V35.0007H24.7218C25.5643 34.9979 26.2466 34.3156 26.2493 33.4731V17.3615C26.2466 16.519 25.5643 15.8367 24.7218 15.834Z"
          fill="black"
        />
        <path
          opacity="0.2"
          d="M23.8885 15.834H15.416V35.0007H23.8885C24.731 34.9979 25.4133 34.3156 25.416 33.4731V17.3615C25.4133 16.519 24.731 15.8367 23.8885 15.834Z"
          fill="black"
        />
        <path
          d="M8.61051 15.834H23.8888C24.7325 15.834 25.4163 16.5179 25.4163 17.3615V32.6398C25.4163 33.4835 24.7325 34.1673 23.8888 34.1673H8.61051C7.76689 34.1673 7.08301 33.4835 7.08301 32.6398V17.3615C7.08301 16.5179 7.76689 15.834 8.61051 15.834Z"
          fill="url(#paint0_linear_383_6942)"
        />
        <path
          d="M13.3516 27.5479C13.3816 27.7837 13.4016 27.9888 13.4108 28.1646H13.4457C13.4591 27.9979 13.4868 27.7971 13.5291 27.5621C13.5713 27.3271 13.6094 27.1285 13.6432 26.9663L15.2499 20.0346H17.3274L18.9941 26.8621C19.0909 27.2866 19.1602 27.7169 19.2016 28.1504H19.2291C19.2602 27.7305 19.3181 27.313 19.4024 26.9004L20.7316 20.0312H22.6224L20.2874 29.9646H18.0783L16.4949 23.3862C16.4491 23.1971 16.3966 22.9496 16.3391 22.6454C16.2816 22.3412 16.2458 22.1187 16.2316 21.9787H16.2041C16.1858 22.1404 16.1499 22.3804 16.0966 22.6987C16.0432 23.0171 16.0005 23.2526 15.9682 23.4054L14.4799 29.9629H12.2332L9.88574 20.0346H11.8107L13.2582 26.9804C13.2908 27.1229 13.3216 27.3129 13.3516 27.5479Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_383_6942"
            x1="10.2679"
            y1="14.6404"
            x2="22.2315"
            y2="35.3609"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2368C4" />
            <stop offset="0.5" stopColor="#1A5DBE" />
            <stop offset="1" stopColor="#1146AC" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
    return (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.5827 24.168L15.416 21.668V40.1405C15.416 40.9841 16.0999 41.668 16.9435 41.668H41.3885C42.2321 41.668 42.916 40.9841 42.916 40.1405V33.3346L29.5827 24.168Z"
          fill="#185C37"
        />
        <path
          d="M29.5827 8.33203H16.9435C16.0999 8.33203 15.416 9.01591 15.416 9.85953V16.6654L29.5827 24.9987L37.0827 27.4987L42.916 24.9987V16.6654L29.5827 8.33203Z"
          fill="#21A366"
        />
        <path
          d="M15.416 16.668H29.5827V25.0013H15.416V16.668Z"
          fill="#107C41"
        />
        <path
          opacity="0.1"
          d="M25.5552 15H15.416V35.8333H25.5552C26.3977 35.8306 27.0799 35.1483 27.0827 34.3058V16.5275C27.0799 15.685 26.3977 15.0027 25.5552 15Z"
          fill="black"
        />
        <path
          opacity="0.2"
          d="M24.7219 15.834H15.416V36.6673H24.7219C25.5643 36.6646 26.2466 35.9823 26.2493 35.1398V17.3615C26.2466 16.519 25.5643 15.8367 24.7219 15.834Z"
          fill="black"
        />
        <path
          opacity="0.2"
          d="M24.7219 15.834H15.416V35.0007H24.7219C25.5643 34.9979 26.2466 34.3156 26.2493 33.4732V17.3615C26.2466 16.519 25.5643 15.8367 24.7219 15.834Z"
          fill="black"
        />
        <path
          opacity="0.2"
          d="M23.8885 15.834H15.416V35.0007H23.8885C24.731 34.9979 25.4133 34.3156 25.416 33.4732V17.3615C25.4133 16.519 24.731 15.8367 23.8885 15.834Z"
          fill="black"
        />
        <path
          d="M8.6105 15.834H23.8888C24.7324 15.834 25.4163 16.5179 25.4163 17.3615V32.6398C25.4163 33.4834 24.7324 34.1673 23.8888 34.1673H8.6105C7.76689 34.1673 7.08301 33.4834 7.08301 32.6398V17.3615C7.08301 16.5179 7.76689 15.834 8.6105 15.834Z"
          fill="url(#paint0_linear_383_6928)"
        />
        <path
          d="M11.8145 29.966L15.0278 24.9868L12.0836 20.0352H14.4519L16.0586 23.2018C16.207 23.5027 16.3086 23.726 16.3636 23.8735H16.3845C16.4883 23.637 16.5995 23.4039 16.7178 23.1743L18.4353 20.0368H20.6094L17.5903 24.9593L20.6861 29.966H18.3728L16.517 26.4902C16.4295 26.3423 16.3554 26.187 16.2953 26.026H16.2678C16.2134 26.1837 16.1413 26.3346 16.0528 26.476L14.142 29.966H11.8145Z"
          fill="white"
        />
        <path
          d="M41.3898 8.33203H29.584V16.6654H42.9173V9.85953C42.9173 9.01591 42.2334 8.33203 41.3898 8.33203Z"
          fill="#33C481"
        />
        <path d="M29.584 25H42.9173V33.3333H29.584V25Z" fill="#107C41" />
        <defs>
          <linearGradient
            id="paint0_linear_383_6928"
            x1="10.2679"
            y1="14.6404"
            x2="22.2315"
            y2="35.3609"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18884F" />
            <stop offset="0.5" stopColor="#117E43" />
            <stop offset="1" stopColor="#0B6631" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (fileName.endsWith(".pdf")) {
    return <AiOutlineFilePdf className="text-red-500 text-3xl" />;
  }
  return <span className="text-gray-500 text-3xl">📄</span>;
};

export default function FileUploads({ control, title }) {
  const intl = useIntl();
  const { field } = useController({
    name: "files",
    control,
    defaultValue: [],
  });

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);

    const totalSize = [...files, ...newFiles].reduce(
      (acc, file) => acc + file.size,
      0
    );

    if (totalSize > MAX_SIZE || files.length + newFiles.length > MAX_FILES) {
      setError(
        intl.formatMessage({
          id: "Umumiy hajmi 100 mb gacha, 10 ta fayllar yuklashingiz mumkin *",
        })
      );
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    field.onChange([...files, ...newFiles]);
  };

  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    field.onChange(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-1">
      {title ? (
        <span className="text-base font-medium text-primary pb-1">{title}</span>
      ) : (
        <></>
      )}
      <label
        className="border border-bg-3 bg-bg-2 p-1 pl-4 rounded-lg text-center cursor-pointer items-center relative flex justify-between max-h-[58px] min-h-[58px]"
        onDrop={handleDrop}
        htmlFor="multiple-files"
        onDragOver={(e) => e.preventDefault()}
      >
        <span className="text-[15px] text-primary font-normal text-opacity-60">
          {intl.formatMessage({ id: "Faylni olib kelib tashlang" })}
        </span>
        <span className="flex items-center gap-1 px-7 py-[15px] h-full bg-main rounded-lg text-white text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.33337 2V4.66667C9.33337 4.84348 9.40361 5.01305 9.52864 5.13807C9.65366 5.2631 9.82323 5.33333 10 5.33333H12.6667M9.33337 2H4.66671C4.31309 2 3.97395 2.14048 3.7239 2.39052C3.47385 2.64057 3.33337 2.97971 3.33337 3.33333V12.6667C3.33337 13.0203 3.47385 13.3594 3.7239 13.6095C3.97395 13.8595 4.31309 14 4.66671 14H11.3334C11.687 14 12.0261 13.8595 12.2762 13.6095C12.5262 13.3594 12.6667 13.0203 12.6667 12.6667V5.33333M9.33337 2L12.6667 5.33333M8.00004 8.66667V10.6667M5.33337 8.66667H6.00004V10.6667H5.33337V8.66667ZM10 8.66667H10.6667V10.6667H10V8.66667Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {intl.formatMessage({ id: "yuklash" })}
        </span>
        <input
          type="file"
          multiple
          id="multiple-files"
          className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            handleDrop({
              preventDefault: () => {},
              dataTransfer: { files: e.target.files },
            });
          }}
        />
      </label>
      <p className="text-sm text-main pt-3">
        {intl.formatMessage({
          id: "Umumiy hajmi 100 mb gacha, 10 ta fayllar yuklashingiz mumkin *",
        })}
      </p>
      <ul className="pt-4 flex flex-row flex-wrap items-start gap-3">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex flex-col gap-1 p-2 relative w-24 text-center justify-center items-center group cursor-pointer"
          >
            <span className="h-[50px] flex items-center justify-center">{getFileIcon(file.name)}</span>
            <span className="text-xs">{file.name}</span>
            <button
              type="button"
              className="text-some_red text-xs absolute top-0 right-0 group-hover:opacity-100 opacity-0 transition-all duration-150"
              onClick={() => handleRemove(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
