type EthereumProvider = {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isRabby?: boolean;
  isBraveWallet?: boolean;
  isTrust?: boolean;
  providers?: EthereumProvider[];
};

type SolanaProvider = {
  isPhantom?: boolean;
};

type WalletWindow = Window & {
  ethereum?: EthereumProvider;
  solana?: SolanaProvider;
  phantom?: { solana?: SolanaProvider };
};

export function detectPlatform(): string {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } };
  const ua = navigator.userAgent;
  const platform = nav.userAgentData?.platform ?? navigator.platform ?? "";
  const mobile = nav.userAgentData?.mobile ?? /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

  if (mobile) {
    if (/Android/i.test(ua) || /Android/i.test(platform)) return "Mobile (Android)";
    if (/iPhone|iPad|iPod/i.test(ua)) return "Mobile (iOS)";
    return "Mobile";
  }
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "Windows";
  if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) return "Mac";
  if (/CrOS/i.test(ua)) return "ChromeOS";
  if (/Linux/i.test(platform) || /Linux/i.test(ua)) return "Linux";
  return platform || "Unknown";
}

export function detectCryptoWallets(): string[] {
  const found = new Set<string>();
  const win = window as WalletWindow;
  const ethereumProviders = win.ethereum?.providers?.length
    ? win.ethereum.providers
    : win.ethereum
      ? [win.ethereum]
      : [];

  for (const provider of ethereumProviders) {
    if (provider.isMetaMask) found.add("MetaMask");
    if (provider.isCoinbaseWallet) found.add("Coinbase Wallet");
    if (provider.isRabby) found.add("Rabby");
    if (provider.isBraveWallet) found.add("Brave Wallet");
    if (provider.isTrust) found.add("Trust Wallet");
  }

  const phantom = win.phantom?.solana ?? win.solana;
  if (phantom?.isPhantom) found.add("Phantom");

  return [...found];
}

export async function detectCountry(): Promise<string> {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/country.json", {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return "Unknown";
    const data = (await response.json()) as { name?: string; country?: string };
    return data.name || data.country || "Unknown";
  } catch {
    return "Unknown";
  }
}

export function normalizeGithubUsername(value: string): string {
  const trimmed = value.trim().replace(/^@/, "");
  const fromUrl = trimmed.match(/github\.com\/([A-Za-z0-9-]+)/i);
  return fromUrl?.[1] ?? trimmed;
}
