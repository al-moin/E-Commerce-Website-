// ============================================================
// ⚙️  কাস্টমাইজ করুন — শুধু এই অংশটুকু পরিবর্তন করুন
// ============================================================
const CONFIG = {
  bkashNumber: '01610362458',   // আপনার bKash নম্বর
  whatsappNumber: '8801610362458', // আপনার WhatsApp নম্বর (880 দিয়ে শুরু)
  facebookPage: 'https://www.facebook.com/profile.php?id=61587699423377',
  deliveryChargeSherpur: 60,     // শেরপুরে ডেলিভারি চার্জ (৳)
  deliveryChargeOutside: 120,    // বাইরে ডেলিভারি চার্জ (৳)
  freeDeliveryMin: 500,          // এই পরিমাণের উপরে ফ্রি ডেলিভারি (শেরপুর)
  comboDiscount: 50,             // কম্বো ছাড়ের পরিমাণ (৳)
};
// ============================================================

// ===== PRODUCT DATA =====
const products = {
  rice: {
    emoji: '🌾',
    image: '<img src="04-03-2026.jpg" alt="Rice" style="width: 100%; height: 100%;">',
    bg: 'linear-gradient(135deg,#E8F5E9,#A5D6A7)',
    title: 'তুলসীমালা চাল',
    origin: '📍 শেরপুর, বাংলাদেশ',
    desc: 'শেরপুরের বিখ্যাত সুগন্ধি তুলসীমালা চাল — বাংলাদেশের অন্যতম সেরা সুগন্ধি চাল। এই চাল রান্না করলে ঘরে মিষ্টি সুঘ্রাণ ছড়িয়ে পড়ে। ভাত হয় নরম, ঝরঝরে এবং সুস্বাদু। পোলাও, বিরিয়ানি এবং সাধারণ ভাত সব ধরনের রান্নায় আদর্শ।',
    features: ['সুগন্ধি জাত', 'ঝরঝরে ভাত', 'ভেজালমুক্ত', 'সরাসরি কৃষক থেকে', 'কোনো রাসায়নিক নেই'],
    sizeLabel: 'প্যাক সাইজ বেছে নিন:',
    sizes: [
      { label: '১ কেজি',  price: '৳১৯০' },
      { label: '৫ কেজি',  price: '৳৪৩০' },
      { label: '১০ কেজি', price: '৳৮৪০' },
      { label: '২৫ কেজি', price: '৳২,০৫০' },
    ],
    basePrice: '৳১৯০ / কেজি',
  },
  oil: {
    emoji: '🫙',
    image: '<img src="final_post _28.02.2026.jpg" alt="Oil" style="width: 100%; height: 100%;">',
    bg: 'linear-gradient(135deg,#FFF8E1,#FFE082)',
    title: 'খাঁটি সরিষার তেল',
    origin: '📍 শেরপুর, বাংলাদেশ',
    desc: 'ঐতিহ্যবাহী ঘানিতে ভাঙা শেরপুরের খাঁটি সরিষার তেল। কোনো রিফাইনিং নেই, কোনো ভেজাল মেশানো নেই। সরিষার তীক্ষ্ণ ঘ্রাণ ও স্বাদ রান্নাকে অসাধারণ করে তোলে। রান্নায় ব্যবহারের পাশাপাশি ত্বক ও চুলের যত্নেও উপকারী।',
    features: ['ঘানিভাঙা খাঁটি', 'কোনো রিফাইনিং নেই', 'ভেজালমুক্ত', 'ওমেগা-৩ সমৃদ্ধ', 'প্রামাণিক স্বাদ'],
    sizeLabel: 'বোতলের সাইজ বেছে নিন:',
    sizes: [
      { label: '৫০০ মিলি', price: '৳১২০' },
      { label: '১ লিটার',  price: '৳৩৫০' },
      { label: '২ লিটার',  price: '৳৬৮০' },
      { label: '৫ লিটার',  price: '৳১,০০০' },
    ],
    basePrice: '৳৩৫০ / লিটার',
  },
};

// ===== MODAL =====
function openModal(type) {
  const p = products[type];
  document.getElementById('modal-img').style.background = p.bg;
  document.getElementById('modal-img').innerHTML = p.image || `<span style="font-size:5rem">${p.emoji}</span>`;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-origin').textContent = p.origin;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-features').innerHTML = p.features
    .map(f => `<span class="feature-tag">✓ ${f}</span>`)
    .join('');
  document.getElementById('modal-size-label').textContent = p.sizeLabel;
  document.getElementById('modal-sizes').innerHTML = p.sizes
    .map((s, i) => `<button class="size-btn${i === 0 ? ' active' : ''}" onclick="selectSize(this,'${s.price}')">${s.label} — ${s.price}</button>`)
    .join('');
  document.getElementById('modal-price').textContent = p.basePrice;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectSize(btn, price) {
  btn.closest('.size-options').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('modal-price').textContent = price;
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function goOrder() {
  closeModal();
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// ===== PRODUCT SELECT IN ORDER FORM =====
let selectedProducts = { rice: true, oil: false };

function toggleProduct(type) {
  selectedProducts[type] = !selectedProducts[type];
  document.getElementById('card-rice').classList.toggle('selected', selectedProducts.rice);
  document.getElementById('card-oil').classList.toggle('selected', selectedProducts.oil);
  document.getElementById('rice-opts').style.display = selectedProducts.rice ? 'block' : 'none';
  document.getElementById('oil-opts').style.display  = selectedProducts.oil  ? 'block' : 'none';
  updateSummary();
}

// ===== QUANTITY =====
function changeQty(type, delta) {
  const el = document.getElementById(type + '-qty');
  el.value = Math.max(1, parseInt(el.value || 1) + delta);
  updateSummary();
}

// ===== PAYMENT INFO =====
function showPayInfo() {
  const val = document.querySelector('input[name=payment]:checked').value;
  document.getElementById('bkash-info').classList.toggle('show', val === 'bkash');
}

// ===== ORDER SUMMARY =====
function updateSummary() {
  let items = [], subtotal = 0;

  if (selectedProducts.rice) {
    const sz    = document.getElementById('rice-size');
    const qty   = parseInt(document.getElementById('rice-qty').value) || 1;
    const price = parseInt(sz.options[sz.selectedIndex].dataset.price);
    const total = price * qty;
    subtotal += total;
    items.push(`<div class="summary-row"><span>🌾 তুলসীমালা চাল × ${qty}</span><span>৳${total.toLocaleString('bn-BD')}</span></div>`);
  }

  if (selectedProducts.oil) {
    const sz    = document.getElementById('oil-size');
    const qty   = parseInt(document.getElementById('oil-qty').value) || 1;
    const price = parseInt(sz.options[sz.selectedIndex].dataset.price);
    const total = price * qty;
    subtotal += total;
    items.push(`<div class="summary-row"><span>🫙 সরিষার তেল × ${qty}</span><span>৳${total.toLocaleString('bn-BD')}</span></div>`);
  }

  if (!items.length) {
    items.push(`<div class="summary-row"><span>কোনো পণ্য নির্বাচন হয়নি</span><span>—</span></div>`);
  }

  document.getElementById('summary-items').innerHTML = items.join('');

  const isSherpur = document.querySelector('input[name=delivery]:checked')?.value === 'sherpur';
  const delivery  = isSherpur
    ? (subtotal >= CONFIG.freeDeliveryMin ? 0 : CONFIG.deliveryChargeSherpur)
    : CONFIG.deliveryChargeOutside;

  document.getElementById('delivery-charge').textContent =
    delivery === 0 ? '🎉 ফ্রি' : `৳${delivery}`;

  const combo = document.getElementById('comboCheck').checked;
  document.getElementById('combo-row').style.display = combo ? 'flex' : 'none';

  const total = subtotal + delivery - (combo ? CONFIG.comboDiscount : 0);
  document.getElementById('total-price').textContent = `৳${Math.max(0, total).toLocaleString('bn-BD')}`;
}

// ===== SUBMIT ORDER =====
function submitOrder() {
  const name     = document.getElementById('cust-name').value.trim();
  const phone    = document.getElementById('cust-phone').value.trim();
  const address  = document.getElementById('cust-address').value.trim();
  const district = document.getElementById('cust-district').value;

  if (!name || !phone || !address || !district) {
    alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।');
    return;
  }
  if (!selectedProducts.rice && !selectedProducts.oil) {
    alert('অন্তত একটি পণ্য নির্বাচন করুন।');
    return;
  }

  const payment = document.querySelector('input[name=payment]:checked').value;
  if (payment === 'bkash' && !document.getElementById('txn-id').value.trim()) {
    alert('bKash Transaction ID লিখুন।');
    return;
  }

  // Build WhatsApp message
  let msg = `🛒 নতুন অর্ডার!\n\n👤 নাম: ${name}\n📱 ফোন: ${phone}\n📍 ঠিকানা: ${address}, ${district}`;
  const thana = document.getElementById('cust-thana').value.trim();
  if (thana) msg += `, ${thana}`;

  if (selectedProducts.rice) {
    const sz  = document.getElementById('rice-size');
    const qty = document.getElementById('rice-qty').value;
    msg += `\n\n🌾 তুলসীমালা চাল: ${sz.options[sz.selectedIndex].text} × ${qty}`;
  }
  if (selectedProducts.oil) {
    const sz  = document.getElementById('oil-size');
    const qty = document.getElementById('oil-qty').value;
    msg += `\n🫙 সরিষার তেল: ${sz.options[sz.selectedIndex].text} × ${qty}`;
  }

  if (document.getElementById('comboCheck').checked) msg += '\n🎁 কম্বো অফার প্রযোজ্য';

  const payLabel = payment === 'bkash' ? 'bKash' : payment === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'WhatsApp';
  msg += `\n\n💳 পেমেন্ট: ${payLabel}`;
  if (payment === 'bkash') msg += ` | TxnID: ${document.getElementById('txn-id').value.trim()}`;
  msg += `\n💰 মোট: ${document.getElementById('total-price').textContent}`;

  const note = document.getElementById('cust-note').value.trim();
  if (note) msg += `\n📝 নোট: ${note}`;

  const waURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  document.getElementById('success-msg').textContent =
    `${name}, আপনার অর্ডার পাওয়া গেছে! নিচের বাটনে ক্লিক করে WhatsApp এ কনফার্ম করুন।`;
  document.getElementById('success-wa-link').href = waURL;
  document.getElementById('success-overlay').classList.add('open');

  if (payment === 'whatsapp') window.open(waURL, '_blank');
}

// ===== INIT =====
updateSummary();
showPayInfo();
