import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="mx-auto max-w-screen-xl p-3">
      <div className="flex flex-col items-start gap-3">
        <div className="font-bold">About</div>
        <Link href="/" className="text-blue-600">Back</Link>
        <div className="flex flex-col gap-3">
          <Image
            src="/portrait.jpeg"
            alt="Nam Woo Joon"
            width={300}
            height={349}
            className="max-w-xs"
          />
          <div className="flex flex-col gap-3">
            <div>
              <div>Nam Woo Joon</div>
              <div>남우준</div>
              <div>南宇俊</div>
            </div>
            <div>I work to maximize humanity's power.</div>
            <div>Seoul and Jeju, South Korea</div>
            <div>Freelance Developer</div>
            <a href="mailto:jungeol66104@gmail.com" className="text-blue-600">
              jungeol66104@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
