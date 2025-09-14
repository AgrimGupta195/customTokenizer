import { useState } from "react";

type Props = {}

const App = (props: Props) => {
  const customToken: Record<string, string> = {
    a: "🍎", b: "🐝", c: "🐱", d: "🐬", e: "🥚", f: "🐸",
    g: "🦒", h: "🏠", i: "🍦", j: "🤹", k: "🔑", l: "🦁",
    m: "🌙", n: "🎶", o: "🍊", p: "🍍", q: "👑", r: "🌹",
    s: "🐍", t: "🌴", u: "☂️", v: "🎻", w: "🌊", x: "❌",
    y: "🍋", z: "⚡",
    0: "0️⃣", 1: "1️⃣", 2: "2️⃣", 3: "3️⃣", 4: "4️⃣",
    5: "5️⃣", 6: "6️⃣", 7: "7️⃣", 8: "8️⃣", 9: "9️⃣",
    " ": "⬜",
    ".": "⚫", ",": "🔻", "!": "❗", "?": "❓",
    "@": "📧", "#": "🔢", "$": "💲", "%": "🔟",
    "^": "⛰️", "&": "🤝", "*": "⭐", "(": "🔓",
    ")": "🔒", "-": "➖", "_": "➖➖", "=": "🟰", "+": "➕",
    "/": "➗", ":": "⏸️", ";": "〰️", "'": "🖊️", "\"": "✍️"
  };

  const [plainText, setPlainText] = useState<string>("");
  const [encodedText, setEncodedText] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");
  const [encodedInput, setEncodedInput] = useState<string>("");
  const [copiedState, setCopiedState] = useState<{ decoded: boolean; encoded: boolean }>({ decoded: false, encoded: false });

  const tokenEntries = Object.entries(customToken).sort((a, b) => b[1].length - a[1].length);

  const encode = (text: string) => {
    text = text.toLowerCase();
    let encoded = "";
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char in customToken) {
        encoded += customToken[char];
      } else {
        encoded += char;
      }
    }
    return encoded;
  };

  const decode = (text: string) => {
    let decoded = "";
    for (let i = 0; i < text.length;) {
      let matched = false;
      for (const [char, token] of tokenEntries) {
        if (text.startsWith(token, i)) {
          decoded += char;
          i += token.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        decoded += text.charAt(i);
        i++;
      }
    }
    return decoded;
  };

  const copyToClipboard = async (text: string, type: "decoded" | "encoded") => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopiedState((prev) => ({ ...prev, [type]: false })), 1500);
    } catch (err) {
      alert("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Text to Emoji Converter</h1>
          <p className="text-lg text-gray-600">Convert text to emojis and back</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Encode Text</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your text
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type something here..."
                  value={plainText}
                  onChange={(e) => {
                    setPlainText(e.target.value);
                    setEncodedText(encode(e.target.value));
                  }}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Encoded result
                  </label>
                  {encodedText && (
                    <button
                      onClick={() => copyToClipboard(encodedText, 'encoded')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {copiedState.encoded ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <textarea
                  className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-md"
                  value={encodedText}
                  placeholder="Emojis will appear here..."
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Decode Emojis</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste emojis here
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Paste encoded emojis..."
                  value={encodedInput}
                  onChange={(e) => {
                    setEncodedInput(e.target.value);
                    setDecodedText(decode(e.target.value));
                  }}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Decoded text
                  </label>
                  {decodedText && (
                    <button
                      onClick={() => copyToClipboard(decodedText, 'decoded')}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {copiedState.decoded ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <textarea
                  className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-md"
                  value={decodedText}
                  placeholder="Decoded text will appear here..."
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Character Reference</h3>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
            {Object.entries(customToken).map(([char, emoji]) => (
              <div key={char} className="text-center p-2 bg-gray-50 rounded border">
                <div className="text-lg mb-1">{emoji}</div>
                <div className="text-xs text-gray-600 font-mono">
                  {char === ' ' ? 'space' : char}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;