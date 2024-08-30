import { useState, useRef } from 'react';
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import QRCode from 'qrcode';
import abhinaya from './assets/abhinaya.jpg';
import acc from './assets/ACC.png';
import adc from './assets/adc.png';
import adu from './assets/adu.png';
import aic from './assets/aic.png';
import anime from './assets/anime.png';
import auqc from './assets/auqc.png';
import ausdg from './assets/ausdg.png';
import batter from './assets/batter.jpg';
import cap from './assets/cap.jpg';
import eeshto from './assets/eeshto.jpg';
import edict from './assets/edict.png'
import enactus from './assets/enactus.png';
import farm from './assets/farm.png';
import fc from './assets/fc.png';
import haalyu from './assets/haalyu.png';
import hcau from './assets/hcau.png';
import hindvi from './assets/hindvi.png';
import ieee from './assets/ieee.png';
import kalinga from './assets/kalinga.jpg';
import khayal_logo from './assets/khayal_logo.png';
import kintsugi from './assets/kintsugi.png';
import langup from './assets/langup.png';
import nc from './assets/nc.png';
import neev from './assets/neev.png';
import orators from './assets/orators.jpg';
import paws from './assets/paws.jpg';
import quiz from './assets/quiz.jpg';
import raah from './assets/raah.png';
import rbw from './assets/rbw.jpg';
import rotaract from './assets/rotaract.jpeg';
import ruhi from './assets/ruhi.jpg';
import siyahi from './assets/siyahi.jpg';
import tcr from './assets/tcr.png';
import tgr from './assets/tgr.png';
import vistaar from './assets/vistaar.jpg';
import war from './assets/war.jpg';
import wif from './assets/wif.jpg';
import eco from './assets/eco.jpg';
import epigraph from './assets/epigraph.jpg';
import psych from './assets/psych.jpg';
import astro from './assets/astro.jpg';
import phys from './assets/phys.jpg';
import wics from './assets/wics.jpg';
import cssoc from './assets/cssoc.jpg';
import cycle from './assets/cycle.jpg';
import { Analytics } from "@vercel/analytics/react"
const clubsAndSocieties = [
  { name: "Abhinaya", logo: abhinaya },
  { name: "Anime Club", logo: anime },
  { name: "Art and Design Collective", logo: adc },
  { name: "Ashoka Consulting Club", logo: acc },
  { name: "Ashoka Debating Union", logo: adu },
  { name: "Ashoka Investment Club", logo: aic },
  { name: "Astronomy Club", logo: astro },
  { name: "AUQC", logo: auqc },
  { name: "AUSDG", logo: ausdg },
  { name: "Caperture", logo: cap },
  { name: "Computer Science Society", logo: cssoc },
  { name: "Cycle", logo: cycle },
  { name: "Economics Society", logo: eco },
  { name: "Edict", logo: edict },
  { name: "Eeshto", logo: eeshto },
  { name: "Enactus Ashoka", logo: enactus },
  { name: "Epigraph", logo: epigraph },
  { name: "Farm Fresh", logo: farm },
  { name: "Feminist Collective", logo: fc },
  { name: "Haalyu", logo: haalyu },
  { name: "HerCampus AU", logo: hcau },
  { name: "Hindvi", logo: hindvi },
  { name: "IEEE Ashoka", logo: ieee },
  { name: "Kalinga", logo: kalinga },
  { name: "Khayal", logo: khayal_logo },
  { name: "Kintsugi", logo: kintsugi },
  { name: "LangUp", logo: langup },
  { name: "Mad Batter", logo: batter },
  { name: "Neev", logo: neev },
  { name: "Northeast Collective", logo: nc },
  { name: "Orators Club", logo: orators },
  { name: "Pawsitive", logo: paws },
  { name: "Physics Society", logo: phys },
  { name: "Psychology Society", logo: psych },
  { name: "Quiz Club", logo: quiz },
  { name: "RAAH", logo: raah },
  { name: "Red Brick Words", logo: rbw },
  { name: "Rotaract Ashoka", logo: rotaract },
  { name: "Ruhi", logo: ruhi },
  { name: "Siyahi", logo: siyahi },
  { name: "The Comic Relief", logo: tcr },
  { name: "The Green Room", logo: tgr },
  { name: "Vistaar", logo: vistaar },
  { name: "War Studies Society", logo: war },
  { name: "Women in Computer Science", logo: wics },
  { name: "Women in Finance", logo: wif }
];

const isValidURL = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef(null);

  const handleUrlChange = (e) => {
    const input = e.target.value;
    setUrl(input);
    if (input === '' || isValidURL(input)) {
      setError(null);
    } else {
      setError('Please enter a valid http or https URL');
    }
  };

  const handleClubChange = (e) => {
    const clubName = e.target.value;
    const club = clubsAndSocieties.find(c => c.name === clubName);
    setSelectedClub(club);
  };

  const handleForegroundColorChange = (e) => setQrColor(e.target.value);
  const handleBackgroundColorChange = (e) => setBgColor(e.target.value);

  const generateCode = async () => {
    setError(null);
    setQrCode(null);

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidURL(url)) {
      setError('Please enter a valid URL');
      return;
    }

    if (!selectedClub) {
      setError('Please select a club');
      return;
    }

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = 1000;
      canvas.height = 1000;

      await QRCode.toCanvas(canvas, url, {
        width: 1000,
        margin: 4,
        color: {
          dark: qrColor,
          light: bgColor
        }
      });

      const logo = new Image();
      logo.onload = () => {
        const logoSize = canvas.width * 0.25;
        const logoPos = (canvas.width - logoSize) / 2;

        ctx.fillStyle = bgColor;
        ctx.fillRect(logoPos, logoPos, logoSize, logoSize);

        ctx.drawImage(logo, logoPos, logoPos, logoSize, logoSize);

        setQrCode(canvas.toDataURL('image/png', 1.0));
      };
      logo.onerror = (error) => {
        console.error("Error loading logo:", error);
        setError("Failed to load club logo. Please try again.");
      };
      logo.src = selectedClub.logo;

    } catch (error) {
      console.error("Error in generateCode:", error);
      setError("Failed to generate QR code. Please try again.");
    }
  };

  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'qr_code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (qrCode) {
      // Convert base64 image to Blob
      const response = await fetch(qrCode);
      const blob = await response.blob();
      const file = new File([blob], 'qr_code.png', { type: 'image/png' });
  
      // Check if Web Share API is supported
      if (navigator.share) {
        navigator
          .share({
            title: 'QR Code',
            text: 'Check out this QR code:',
            files: [file], // This is where you include the image file
          })
          .then(() => console.log('Successfully shared'))
          .catch((error) => console.error('Error sharing', error));
      } else {
        alert('Web Share API is not supported in your browser. Please share manually.');
      }
    }
  };
  
  return (
    <div>
      <Analytics></Analytics>
      <Card className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg my-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center">Ashoka Club QR Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 py-4">
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={handleUrlChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <div className="relative">
              <select
                value={selectedClub ? selectedClub.name : ''}
                onChange={handleClubChange}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
              >
                <option value="">Select a club or society</option>
                {clubsAndSocieties.map((club) => (
                  <option key={club.name} value={club.name}>
                    {club.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex items-center justify-between sm:w-1/2">
                <label htmlFor="qrColor" className="text-sm font-medium mr-2">QR Color:</label>
                <Input
                  type="color"
                  id="qrColor"
                  value={qrColor}
                  onChange={handleForegroundColorChange}
                  className="w-12 h-8 p-0 border-none"
                />
              </div>
              <div className="flex items-center justify-between sm:w-1/2">
                <label htmlFor="bgColor" className="text-sm font-medium mr-2">BG Color:</label>
                <Input
                  type="color"
                  id="bgColor"
                  value={bgColor}
                  onChange={handleBackgroundColorChange}
                  className="w-12 h-8 p-0 border-none"
                />
              </div>
            </div>
            <Button
              onClick={generateCode}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate QR Code
            </Button>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {qrCode && (
            <div className="space-y-4 mt-6">
              <img src={qrCode} alt="Generated QR Code" className="mx-auto w-full max-w-xs rounded-lg shadow-md" />
              <div className="flex space-x-2">
                <Button
                  onClick={handleDownload}
                  className="w-1/2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Download
                </Button>
                <Button
                  onClick={handleShare}
                  className="w-1/2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-black">
        Made with <span role="img" aria-label="sparkle">✨</span> by <a href="https://instagram.com/sportlight.fun" className="no-underline italic text-orange-500" target="_blank" rel="noopener noreferrer">sportlight</a>
      </footer>
    </div>
  );
};

export default QRCodeGenerator;