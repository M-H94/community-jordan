(() => {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }));

  // Event date: Saturday, 7 November 2026 at 4:00 PM (Amman time).
  const eventDate = new Date('2026-11-07T16:00:00+03:00').getTime();
  const updateCountdown = () => {
    const remaining = eventDate - Date.now();
    const values = remaining <= 0
      ? [0, 0, 0, 0]
      : [
          Math.floor(remaining / 86400000),
          Math.floor((remaining % 86400000) / 3600000),
          Math.floor((remaining % 3600000) / 60000),
          Math.floor((remaining % 60000) / 1000)
        ];
    ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(values[index]).padStart(2, '0');
    });
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const form = document.getElementById('registrationForm');
  const typeInput = document.getElementById('registrationType');
  const teamFields = document.getElementById('teamFields');
  const teamName = document.getElementById('teamName');
  const player2 = document.getElementById('player2');
  const player3 = document.getElementById('player3');

  document.querySelectorAll('.type-button').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.type;
      document.querySelectorAll('.type-button').forEach(item => item.classList.toggle('active', item === button));
      typeInput.value = type;
      teamFields.hidden = type !== 'team';
      [teamName, player2, player3].forEach(input => {
        input.required = type === 'team';
      });
    });
  });

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submitButton = form.querySelector('[type=submit]');
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'جارٍ حفظ التسجيل...'; }
    const data = new FormData(form);
    const type = data.get('registrationType');
    const lines = [
      'السلام عليكم، أرغب بالتسجيل في فعالية Jordan Community - Generals Zero Hour.',
      '',
      `نوع التسجيل: ${type === 'team' ? 'فريق' : 'لاعب منفرد'}`,
      `الاسم الكامل: ${data.get('name')}`,
      `اسم اللاعب: ${data.get('nickname')}`,
      `رقم الهاتف: ${data.get('phone')}`
    ];
    if (type === 'team') {
      lines.push(`اسم الفريق: ${data.get('teamName')}`, `اللاعب الثاني: ${data.get('player2')}`, `اللاعب الثالث: ${data.get('player3')}`);
      if (data.get('substitute')) lines.push(`الاحتياطي: ${data.get('substitute')}`);
    }
    if (data.get('notes')) lines.push(`ملاحظات: ${data.get('notes')}`);
    lines.push('', 'موعد الفعالية: السبت 7 نوفمبر 2026 - الساعة 4:00 مساءً');
    const payload = {
      registration_type: type, full_name: data.get('name'), nickname: data.get('nickname'),
      phone: data.get('phone'), team_name: type === 'team' ? data.get('teamName') : null,
      player2: type === 'team' ? data.get('player2') : null, player3: type === 'team' ? data.get('player3') : null,
      substitute: data.get('substitute') || null, notes: data.get('notes') || null
    };
    try {
      const client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
      const { error } = await client.from('registrations').insert(payload);
      if (error) throw error;
      form.reset();
      alert('تم استلام تسجيلك بنجاح! سنتواصل معك لتأكيد المشاركة.');
    } catch (err) {
      console.error(err);
      alert('ما قدرنا نحفظ التسجيل. تأكد من إعداد جدول Supabase وسياسات الأمان ثم حاول مرة ثانية.');
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.innerHTML = 'إرسال طلب التسجيل <span>←</span>'; }
    }
  });
})();
