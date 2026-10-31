// Run: npm test   (Node runs the TypeScript file directly)
import test from 'node:test';
import assert from 'node:assert/strict';
import { detectDevice } from '../src/lib/device.ts';

const UA = {
  chromeAndroid: 'Mozilla/5.0 (Linux; Android 14; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
  samsungInternet: 'Mozilla/5.0 (Linux; Android 13; SM-M325F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36',
  instagram: 'Mozilla/5.0 (Linux; Android 14; RMX3741 Build/UP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.58 Mobile Safari/537.36 Instagram 352.0.0.38.100 Android (34/14; 480dpi; 1080x2400; realme; RMX3741; en_IN; 650301430)',
  facebook: 'Mozilla/5.0 (Linux; Android 13; V2207 Build/TP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/129.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/485.0.0.70.77;]',
  snapchat: 'Mozilla/5.0 (Linux; Android 12; M2101K6P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36 Snapchat/13.10.0.42 (like Safari/604.1)',
  linkedin: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36 LinkedInApp',
  webview: 'Mozilla/5.0 (Linux; Android 11; Redmi Note 9; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0 Mobile Safari/537.36',
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1',
  iphoneInstagram: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 352.0.0',
  ipadDesktopMode: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  windowsChrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
};

test('Android in a normal browser downloads directly', () => {
  assert.equal(detectDevice(UA.chromeAndroid), 'android');
  assert.equal(detectDevice(UA.samsungInternet), 'android');
});

test('Android inside Instagram, Facebook, Snapchat, LinkedIn or a plain WebView is told to open Chrome', () => {
  for (const k of ['instagram', 'facebook', 'snapchat', 'linkedin', 'webview']) assert.equal(detectDevice(UA[k]), 'android-inapp', k);
});

test('iPhone and iPad never get the APK, even in Instagram or iPad desktop mode', () => {
  assert.equal(detectDevice(UA.iphone), 'ios');
  assert.equal(detectDevice(UA.iphoneInstagram), 'ios');
  assert.equal(detectDevice(UA.ipadDesktopMode, { platform: 'MacIntel', maxTouchPoints: 5 }), 'ios');
});

test('a computer gets the QR code', () => {
  assert.equal(detectDevice(UA.windowsChrome, { platform: 'Win32', maxTouchPoints: 0 }), 'desktop');
  assert.equal(detectDevice(UA.mac, { platform: 'MacIntel', maxTouchPoints: 0 }), 'desktop');
});
