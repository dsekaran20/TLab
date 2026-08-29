/* ============================================================
   முத்தும் பாடலும்
   சங்ககாலத் தமிழகம் ஊக்கமாக அமைந்த ஆறு காட்சி முன்மாதிரி
   ============================================================ */

(function () {
  "use strict";

  const initialState = () => ({
    sceneId: "korkai_shore",
    meters: {
      reputation: 4,
      pearls: 3,
      stamina: 6,
      wisdom: 2,
    },
    inventory: [
      { id: "pouch", glyph: "மு", name: "முத்துகள் அடங்கிய முத்திரைப் பை" },
      { id: "verse", glyph: "பா", name: "ஓலைச்சுவடியில் எழுதப்பட்ட பாடல்" },
      { id: "water", glyph: "நீ", name: "கிணற்று நீர் நிரம்பிய குடுவை" },
    ],
    visited: [],
  });

  let state = initialState();

  const METER_DEFS = [
    { key: "reputation", label: "அரசவையில் நற்பெயர்", max: 10 },
    { key: "pearls", label: "பையில் உள்ள முத்துகள்", max: 10 },
    { key: "stamina", label: "பயணத் தெம்பு", max: 10 },
    { key: "wisdom", label: "பாடல் அறிவு", max: 10 },
  ];

  const ROUTE = [
    { id: "korkai_shore", label: "கொற்கை" },
    { id: "salt_road", label: "உப்பு வழி" },
    { id: "vaigai_ford", label: "வைகைத் துறை" },
    { id: "grove_camp", label: "பனைத் தோப்பு" },
    { id: "city_gate", label: "மதுரை வாயில்" },
    { id: "royal_hall", label: "அரசவை" },
  ];

  const SCENES = {
    korkai_shore: {
      title: "அலை ஒரு பணியை கொண்டு வருகிறது",
      place: "கொற்கை, முத்துக் கரை",
      text: [
        "விடியற்காலப் பிடிப்புடன் முத்துக்குளிப்போர் கரை திரும்பும் போது, உப்பு மணம் கூந்தலைத் தழுவுகிறது. படகினரின் தலைவி ஆண்டை, சிறிய துணிப் பையை உங்கள் உள்ளங்கையில் வைக்கிறாள். மூன்று முத்துகள், அவள் சொல்கிறாள், கொக்கின் கண் போல பால் வெண்மை கொண்டவை; அவை மதுரையில் இருக்கும் பாண்டிய அரசவைக்கான காணிக்கை.",
        "அவள் இன்னொரு மெல்லிய ஓலைத் துண்டையும் தருகிறாள். கடற்கரைக் கவிஞர் ஒருவர், கவனமான கையால், அதில் ஒரு குறும் பாடலை எழுதிச் சென்றுள்ளார்.",
        { verse: "“சங்கு தன் முத்தை அமைதியில் காக்கும்;\nஅரசன் தன் நீதியை அமைதியில் காக்கட்டும்.”" },
        "முத்துப் பையும் பாடலும் எடுத்துக் கொண்டு, உப்பு வழியையும் வைகையையும் கடந்து, அரசரின் மண்டபத்தில் கூடும் புலவர்களை அடைய வேண்டும்.",
      ],
      choices: [
        {
          label: "தாழ்ந்து வணங்கி, இரண்டையும் முறையாக ஏற்றுக் கொள்.",
          effects: { reputation: +1, wisdom: +1, stamina: -1 },
          hint: "+ நற்பெயர், + அறிவு, − தெம்பு",
          next: "salt_road",
        },
        {
          label: "புறப்படுவதற்கு முன், பாடலை வாயால் சொல்லிக் கற்றுக் கொடுக்க ஆண்டையிடம் கேள்.",
          effects: { wisdom: +2, stamina: -1 },
          hint: "+ + அறிவு, − தெம்பு",
          next: "salt_road",
        },
        {
          label: "பையை விரைவாக வைத்துக் கொண்டு உடனே பாதை பிடி.",
          effects: { stamina: +1, reputation: -1 },
          hint: "+ தெம்பு, − நற்பெயர்",
          next: "salt_road",
        },
      ],
    },

    salt_road: {
      title: "உப்பு வழியின் நடுப்பகல் வெப்பம்",
      place: "கரையிலிருந்து உள்நாட்டுக்குச் செல்லும் உப்பளப் பாதை",
      text: [
        "குறைந்த புதர்களுக்கிடையில் உப்பு வழி வெண்மையான கோடு போல நீள்கிறது. சூரியன் உப்பளங்களை அடிக்க, உங்கள் நிழல் பாதங்களின் கீழ் சுருங்குகிறது. முன்னால் மருதன் என்ற வணிகன் மாட்டுவண்டியுடன் செல்கிறான்; விழிப்பு காக்க வணிகப் பாடல்களை அவன் கூவுகிறான்.",
        "உங்கள் தூதர் பட்டையைப் பார்த்ததும் அவன் வேகத்தை குறைக்கிறான். “வைகை வரை என்னோடு வா,” என்று அவன் சொல்கிறான். “பதிலுக்கு அரசவையைப் பற்றி ஒன்றைச் சொல். அல்லது ஒரு முத்தை எனக்குச் சொல்; எடையை விட அதிகம் தருவேன்.”",
      ],
      choices: [
        {
          label: "வண்டியில் ஏறி, அரச ரகசியம் இல்லாத பாதைச் செய்திகளைப் பகிர்.",
          effects: { stamina: +2, reputation: +0 },
          hint: "+ + தெம்பு",
          next: "vaigai_ford",
        },
        {
          label: "ஒரு முத்தை அமைதியாக விற்றுவிடு. கால்களை விட நாணயம் தூரம் செலும்.",
          effects: { pearls: -1, stamina: +1, wisdom: +1 },
          hint: "− முத்து, + தெம்பு, + அறிவு",
          next: "vaigai_ford",
        },
        {
          label: "தனியாக நடந்து செல். இந்தப் பை பேரம் பேசுவதற்கல்ல.",
          effects: { reputation: +2, stamina: -2 },
          hint: "+ + நற்பெயர், − − தெம்பு",
          next: "vaigai_ford",
        },
      ],
    },

    vaigai_ford: {
      title: "வைகை இன்று உயர்ந்து ஓடுகிறது",
      place: "வைகை ஆற்றின் ஆழமற்ற கடப்பிடம்",
      text: [
        "மாலைக்குள் நீங்கள் வைகையை அடைகிறீர்கள். இந்தப் பருவத்திற்கு மீறி நீர் உயர்ந்து ஓடுகிறது; மேற்குத் தொடரின் தாமதமான மழை காரணமாக இருக்கலாம். பழுப்பு நீரோட்டத்தில் நாணல்கள் குனிகின்றன. எதிர்கரையில் கொள்ளன் என்ற படகோட்டி தன் கோலைச் சாய்த்து உங்களை அளந்து பார்க்கிறான்.",
        "ஒரு முத்து கொடுத்தால் கடத்துவேன் என அவன் கூவுகிறான். இல்லையெனில் “நாளை பாடத் தகுந்த” ஒரு பாடலைக் கூறலாம். அல்லது மேல் துறையில் நீங்களே கடக்கலாம்; அங்கே கற்கள் காலடியில் உருண்டு விடும்.",
      ],
      choices: [
        {
          label: "ஒரு முத்தை கொடு. நனைந்த பையை விட இலகுவான பை மேல்.",
          effects: { pearls: -1, stamina: +1 },
          hint: "− முத்து, + தெம்பு",
          next: "grove_camp",
        },
        {
          label: "கடற்கரைக் கவிஞரின் பாடலைக் கூறி கடத்தச் சொல்.",
          effects: { wisdom: +1, reputation: +1, pearls: 0 },
          hint: "+ அறிவு, + நற்பெயர்",
          requires: { wisdom: 3 },
          fail: {
            label: "(சந்தம் தடுமாறுகிறது; கொள்ளன் சிரித்து மறுக்கிறான்.)",
            effects: { wisdom: +1, stamina: -2 },
            next: "grove_camp",
          },
          next: "grove_camp",
        },
        {
          label: "மேல் துறையில் நீங்களே நீரை நடந்து கடக்க முயல்.",
          effects: { stamina: -3, reputation: +1 },
          hint: "− − − தெம்பு, + நற்பெயர்",
          next: "grove_camp",
        },
      ],
    },

    grove_camp: {
      title: "பனைத் தோப்பில் இரவு",
      place: "நகருக்கு தெற்கே உள்ள பனைத் தோப்பு",
      text: [
        "பனைமரங்கள் நிற்கும் தோப்பில் நீங்கள் இரவுக்குத் தங்குகிறீர்கள். கள்ளெடுப்போரின் ஏணிகள் மரங்களுக்கு சாய்ந்துள்ளன; இரவுக்காக சாறு குடங்கள் இறக்கப்பட்டுள்ளன. நெருப்பருகே இரு பயணிகள் அமர்ந்துள்ளனர்: மடியில் சிறிய யாழுடன் வெள்ளி என்ற அலைந்து திரியும் பாணர், முதுகில் கேடயம் சுமந்து காவலுக்குத் திரும்பும் புள்ளி என்ற வீரன்.",
        "உன்னிடம் பாடலாக மாறத் தகுந்த ஏதாவது உள்ளதா என்று வெள்ளி கேட்கிறாள். மதுரை வாயிலில் சீரற்றும் மரியாதையற்றும் வரும் தூதர்களை காவலர்கள் திருப்பி அனுப்புகிறார்கள் என்று புள்ளி எச்சரிக்கிறான்.",
      ],
      choices: [
        {
          label: "பாடலை வெள்ளியிடம் பகிர்ந்து, அதைச் சுற்றி அவள் இசைக்க அனுமதி தா.",
          effects: { wisdom: +2, reputation: +1, stamina: -1 },
          hint: "+ + அறிவு, + நற்பெயர்",
          next: "city_gate",
        },
        {
          label: "புள்ளியுடன் அமர்ந்து, வாயிலின் மரியாதை முறைகளை அறிந்து கொள்.",
          effects: { wisdom: +1, reputation: +2 },
          hint: "+ அறிவு, + + நற்பெயர்",
          next: "city_gate",
        },
        {
          label: "விரைவாகத் தூங்கு. பையைப் பாதுகாப்பதே இப்போது முக்கியம்.",
          effects: { stamina: +3, wisdom: -1 },
          hint: "+ + + தெம்பு, − அறிவு",
          next: "city_gate",
        },
      ],
    },

    city_gate: {
      title: "மதுரையின் வாயிலடியில்",
      place: "பாண்டியத் தலைநகரின் தெற்கு வாயில்",
      text: [
        "காலை மதுரை எழுகிறது: மண்-செங்கல் மதில்கள், நீலம்-மணல் நிறக் கொடிகள், சந்தை வீதியிலிருந்து வரும் ஏலக்காய் மணம். விண்ணப்பத்தார் வரிசையாக வாயிலில் காத்திருக்கிறார்கள். மீன் சின்னம் பொறித்த ஆடை அணிந்த தலைவன், ஒவ்வொருவரையும் கண்களால் அளக்கிறான்.",
        "உங்கள் முறை வந்ததும் அவன் நேராகக் கேட்கிறான்: “தூதனே, என்ன கொண்டு வருகிறாய்? யார் அனுப்பினர்?”",
      ],
      choices: [
        {
          label: "கொற்கை ஆண்டையின் பெயரைச் சொல்லி, பையை வெளிப்படையாகக் காட்டு.",
          effects: { reputation: +2 },
          hint: "+ + நற்பெயர்",
          next: "royal_hall",
        },
        {
          label: "முதலில் பாடலைச் சொல்லி, பின்னர் அனுப்பியவர்களின் பெயரை கூறு.",
          effects: { reputation: +3, wisdom: +1 },
          hint: "+ + + நற்பெயர், + அறிவு",
          requires: { wisdom: 4 },
          fail: {
            label: "(நீங்கள் தடுமாறுகிறீர்கள்; தலைவன் முகம் சுளித்தபடி உள்ளே அனுப்புகிறான்.)",
            effects: { reputation: -1 },
            next: "royal_hall",
          },
          next: "royal_hall",
        },
        {
          label: "விரைவில் பார்க்கும்படி ஒரு முத்தை முன்வை. நேரம் குறைவு.",
          effects: { pearls: -1, reputation: -1, stamina: +1 },
          hint: "− முத்து, − நற்பெயர், + தெம்பு",
          next: "royal_hall",
        },
      ],
    },

    royal_hall: {
      title: "புலவர்களும் அரசனும் இருக்கும் மண்டபம்",
      place: "மதுரை, பாண்டிய அரச மண்டபம்",
      text: [
        "மண்டபம் நீளமும் குளிர்ச்சியும் கொண்டது. தரையில் நெய்த பனைப் பாய்கள் விரிக்கப்பட்டுள்ளன; கருமர மேடையைச் சுற்றி புலவர்கள் அரை வட்டமாக அமர்ந்துள்ளனர். பாண்டிய அரசன் கண்களை மூடி கேட்கிறான்; பழைய அரசர்கள் சொற்களின் அடியில் இருக்கும் சந்தத்தை இப்படித்தான் கேட்பார்கள் என கூறுவர்.",
        "ஒரு பணியாளர் உங்களை முன் வரச் சொன்னதும், மண்டபம் முழுவதும் உங்களை நோக்கித் திரும்புகிறது. ஒரு கையில் பை, இன்னொரு கையில் ஓலை.",
      ],
      choices: [
        {
          label: "முதலில் பையை வைத்து, பின்னர் பாடலை நினைவில் இருந்து சொல்.",
          effects: { reputation: +2, wisdom: +1 },
          hint: "+ + நற்பெயர், + அறிவு",
          next: "ending",
        },
        {
          label: "முதலில் பாடலை வாசித்து, அதன் எதிரொலியாக பையை அளி.",
          effects: { reputation: +3, wisdom: +2 },
          hint: "+ + + நற்பெயர், + + அறிவு",
          requires: { wisdom: 5 },
          fail: {
            label: "(இரண்டாம் வரியில் குரல் உடைகிறது; அவசரமாக பையை கீழே வைக்கிறீர்கள்.)",
            effects: { reputation: -1, wisdom: +1 },
            next: "ending",
          },
          next: "ending",
        },
        {
          label: "அமைதியாகப் பையை அளித்து பின் செல்; பாடல் ஓலையிலேயே ஓயட்டும்.",
          effects: { reputation: +1, wisdom: -1 },
          hint: "+ நற்பெயர், − அறிவு",
          next: "ending",
        },
      ],
    },
  };

  function pickEnding(m) {
    const total = m.reputation + m.pearls + m.stamina + m.wisdom;
    if (m.reputation >= 9 && m.wisdom >= 5) return ENDINGS.bard_of_the_road;
    if (m.pearls <= 1 && m.wisdom >= 5) return ENDINGS.poet_courier;
    if (m.pearls >= 4 && m.reputation <= 4) return ENDINGS.cautious_merchant;
    if (m.stamina <= 2) return ENDINGS.weary_arrival;
    if (total >= 22) return ENDINGS.honored_courier;
    return ENDINGS.quiet_return;
  }

  const ENDINGS = {
    bard_of_the_road: {
      banner: "நினைவில் நிற்கும் பெயர்",
      title: "அரசவை உங்களை மீண்டும் அழைக்கிறது",
      text: [
        "உங்கள் கடைசி அசை முடிந்த பிறகே அரசன் கண்களைத் திறக்கிறான். அவன் ஒருமுறை தலையசைக்கிறான். பணியாளர் ஓலையில் உங்கள் பெயரை எழுதுகிறான்: கடற்கரைச் சிற்றூரைச் சேர்ந்த இளவன். அரசவைக் கவிஞர் பழைய மரபுப்படி உங்கள் தோளைக் தொடுகிறார்.",
        "அடுத்த கூடுகைக்கு மீண்டும் வரும்படி அழைப்புடன் நீங்கள் மண்டபத்திலிருந்து வெளியேறுகிறீர்கள். ஆண்டையின் பை சிறியது. உண்மையான காணிக்கை பாடல்தான் என்று தெரிகிறது.",
      ],
    },
    poet_courier: {
      banner: "செல்வத்தை விட பாடல்",
      title: "இலகு பை, நிறைந்த வாய்",
      text: [
        "முத்துகள் சிலவே மீதமிருக்கின்றன. பாதை கேட்ட இடங்களில் அவற்றைச் செலவிட்டீர்கள். ஆனால் பாடல் உடையாமல் வந்தது; அரசன் அதன் இரண்டாம் வரியை உரக்கச் சொல்கிறான், புலவர்கள் அதை பதிவு செய்யும்படி.",
        "அடுத்த அலை திரும்பும் முன் ஆண்டை இதை அறிந்துவிடுவாள். காணாமல் போன முத்துகளை அவள் குறை சொல்லமாட்டாள்.",
      ],
    },
    cautious_merchant: {
      banner: "பாதுகாப்பான ஒப்படைப்பு",
      title: "எண்ணியதும் சுத்தமானதும்",
      text: [
        "பெரும்பாலான முத்துகள் கைக்குள் இருக்கும் நிலையில், பணியாளரின் முத்திரையுடன் நீங்கள் கொற்கைக்கு திரும்புகிறீர்கள். ஆண்டை பையைப் பார்த்து மகிழ்கிறாள். அரசவை பாடலை மரியாதையுடன் ஏற்றது; அந்த இரவு புலவர் யாரும் அதை பாடவில்லை, ஆனால் அவமதிப்பும் இல்லை.",
        "சில தூதர்களுக்கு வணிகனின் வழியே ஏற்றது. உங்களுக்கு எது பொருந்தும் என்பதை இப்போது அறிந்துள்ளீர்கள்.",
      ],
    },
    weary_arrival: {
      banner: "உடல் சோர்ந்தும் பணி முடிந்தது",
      title: "பாதை தன் பங்கை எடுத்தது",
      text: [
        "வீங்கிய பாதங்களோடு, மெலிந்த குரலோடு, சிவந்த கண்களோடு நீங்கள் மண்டபத்தை அடைகிறீர்கள். பை ஒப்படைக்கப்படுகிறது; பாடலை பணியாளர் உங்களுக்குப் பதிலாக வாசிக்கிறான். அரசனின் கவனம் குறுகியதாயினும் அன்பானது.",
        "திரும்பும் வழியில், சாலையோரச் சின்ன மடத்தில் மூன்று நாட்கள் தூங்குகிறீர்கள். தன் வேகத்தை அளவிடாத தூதர்களை பாதை நினைவில் வைத்துக் கொள்கிறது.",
      ],
    },
    honored_courier: {
      banner: "சமநிலை கொண்ட பயணம்",
      title: "பையும் பாடலும் இரண்டும் வந்தடைந்தன",
      text: [
        "மண்டப வாயிலில் நின்றபடி நகரின் ஒலியை உணர்கிறீர்கள்: திறக்கும் சந்தைகள், ஓடும் ஆறு, கொற்கையில் விடியற்கடலுக்கு நடந்து செல்லும் முத்துக்குளிப்போர். பை ஒப்படைக்கப்பட்டது. பாடல் சொல்லப்பட்டது. திரும்பும் பாதைக்கு உடலில் இன்னும் தெம்பு உள்ளது.",
        "சில தூதர்கள் கடினமான பயணங்களைப் பற்றி பெருமை பேசுவர். நீங்கள் அப்படி செய்யமாட்டீர்கள். ஆனாலும் புலவர்கள் உங்கள் பெயரை குறித்துள்ளனர்.",
      ],
    },
    quiet_return: {
      banner: "கவனிக்கப்படாத பணி",
      title: "இழப்பில்லை, பெரும் புகழில்லை",
      text: [
        "பை அளிக்கப்படுகிறது. பாடல் வாசிக்கப்படுகிறது. அந்த நாள் அரசவைக்கு அதைவிடப் பெரிய காரியங்கள் உள்ளன; உங்கள் பெயர் பணியாளரின் கணக்கைத் தாண்டி செல்லாது.",
        "மாலைச் சில்லென்ற நேரத்தில் உப்பு வழி பிடித்து வீடு திரும்புகிறீர்கள். சில சமயம், தூதனின் சிறந்த வேலை வெறுமனே வந்தடைவதே.",
      ],
    },
  };

  const $ = (id) => document.getElementById(id);

  function clampMeters(m) {
    for (const def of METER_DEFS) {
      m[def.key] = Math.max(0, Math.min(def.max, m[def.key]));
    }
  }

  function applyEffects(effects) {
    if (!effects) return;
    for (const key of Object.keys(effects)) {
      if (state.meters[key] !== undefined) state.meters[key] += effects[key];
    }
    clampMeters(state.meters);
  }

  function meetsRequirement(req) {
    if (!req) return true;
    for (const k of Object.keys(req)) {
      if ((state.meters[k] ?? 0) < req[k]) return false;
    }
    return true;
  }

  function renderMeters() {
    const ul = $("meters");
    ul.innerHTML = "";
    for (const def of METER_DEFS) {
      const val = state.meters[def.key];
      const li = document.createElement("li");
      li.className = "meter";
      li.setAttribute("data-testid", `meter-${def.key}`);
      const pct = Math.round((val / def.max) * 100);
      li.innerHTML = `
        <span class="meter-label">${def.label}</span>
        <span class="meter-value" data-testid="value-${def.key}">${val} / ${def.max}</span>
        <div class="meter-bar"><div class="meter-fill ${def.key}" style="width:${pct}%"></div></div>
      `;
      ul.appendChild(li);
    }
  }

  function renderInventory() {
    const ul = $("inventory");
    ul.innerHTML = "";
    if (!state.inventory.length) {
      const li = document.createElement("li");
      li.className = "inv-empty";
      li.textContent = "பை காலியாக உள்ளது.";
      ul.appendChild(li);
      return;
    }
    for (const item of state.inventory) {
      const li = document.createElement("li");
      li.className = "inv-item";
      li.setAttribute("data-testid", `inv-${item.id}`);
      li.innerHTML = `<span class="glyph" aria-hidden="true">${item.glyph}</span><span>${item.name}</span>`;
      ul.appendChild(li);
    }
  }

  function renderRoute() {
    const ol = $("routeMarkers");
    ol.innerHTML = "";
    const currentIdx = ROUTE.findIndex((r) => r.id === state.sceneId);
    ROUTE.forEach((r, i) => {
      const li = document.createElement("li");
      if (i < currentIdx || (state.sceneId === "ending" && i <= ROUTE.length - 1)) {
        li.classList.add("done");
      }
      if (r.id === state.sceneId) li.classList.add("current");
      li.setAttribute("data-testid", `route-${r.id}`);
      li.innerHTML = `<div class="dot"></div><span>${r.label}</span>`;
      ol.appendChild(li);
    });
  }

  function renderSceneText(textArr, container) {
    container.innerHTML = "";
    for (const part of textArr) {
      if (typeof part === "string") {
        const p = document.createElement("p");
        p.style.margin = "0 0 14px";
        p.textContent = part;
        container.appendChild(p);
      } else if (part && part.verse) {
        const v = document.createElement("span");
        v.className = "verse";
        v.textContent = part.verse;
        container.appendChild(v);
      }
    }
  }

  function renderScene(id) {
    state.sceneId = id;
    if (!state.visited.includes(id)) state.visited.push(id);

    const card = document.querySelector(".scene-card");
    card.classList.remove("scene-enter");
    void card.offsetWidth;
    card.classList.add("scene-enter");

    if (id === "ending") {
      renderEnding();
      renderMeters();
      renderInventory();
      renderRoute();
      return;
    }

    const scene = SCENES[id];
    const idx = ROUTE.findIndex((r) => r.id === id);
    $("sceneNo").textContent = `காட்சி ${String(idx + 1).padStart(2, "0")}`;
    $("scenePlace").textContent = scene.place;
    $("sceneTitle").textContent = scene.title;

    renderSceneText(scene.text, $("sceneText"));

    const choicesEl = $("choices");
    choicesEl.innerHTML = "";
    scene.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.type = "button";
      btn.setAttribute("data-testid", `button-choice-${id}-${i + 1}`);
      btn.innerHTML = `
        <span>${choice.label}</span>
        ${choice.hint ? `<span class="choice-effects">${choice.hint}</span>` : ""}
      `;
      btn.addEventListener("click", () => onChoice(choice));
      choicesEl.appendChild(btn);
    });

    renderMeters();
    renderInventory();
    renderRoute();
  }

  function onChoice(choice) {
    if (choice.requires && !meetsRequirement(choice.requires)) {
      const fb = choice.fail;
      if (fb) {
        applyEffects(fb.effects);
        renderScene(fb.next || choice.next);
        return;
      }
    }
    applyEffects(choice.effects);
    renderScene(choice.next);
  }

  function renderEnding() {
    const m = state.meters;
    const ending = pickEnding(m);
    const card = document.querySelector(".scene-card");

    $("sceneNo").textContent = "இறுதி காட்சி";
    $("scenePlace").textContent = "அரசவைக்குப் பின்";
    $("sceneTitle").textContent = ending.title;

    const textEl = $("sceneText");
    textEl.innerHTML = "";

    const banner = document.createElement("span");
    banner.className = "ending-banner";
    banner.setAttribute("data-testid", "text-ending-banner");
    banner.textContent = ending.banner;
    textEl.appendChild(banner);

    for (const para of ending.text) {
      const p = document.createElement("p");
      p.style.margin = "12px 0";
      p.textContent = para;
      textEl.appendChild(p);
    }

    const total = m.reputation + m.pearls + m.stamina + m.wisdom;
    const summary = document.createElement("div");
    summary.className = "ending-summary";
    summary.setAttribute("data-testid", "container-ending-summary");
    summary.innerHTML = `
      <h3>இறுதி கணக்கு</h3>
      <ul>
        <li>அரசவையில் நற்பெயர்: <strong>${m.reputation}/10</strong></li>
        <li>மீதமுள்ள முத்துகள்: <strong>${m.pearls}/10</strong></li>
        <li>வந்தடைந்தபோதுள்ள தெம்பு: <strong>${m.stamina}/10</strong></li>
        <li>பாடல் அறிவு: <strong>${m.wisdom}/10</strong></li>
        <li>மொத்த நிலை: <strong>${total}/40</strong></li>
      </ul>
    `;
    textEl.appendChild(summary);

    const choicesEl = $("choices");
    choicesEl.innerHTML = "";
    const actions = document.createElement("div");
    actions.className = "ending-actions";

    const replay = document.createElement("button");
    replay.className = "solid-btn";
    replay.type = "button";
    replay.setAttribute("data-testid", "button-replay");
    replay.textContent = "பாதையை மீண்டும் நட";
    replay.addEventListener("click", restart);
    actions.appendChild(replay);

    const share = document.createElement("button");
    share.className = "ghost-btn";
    share.type = "button";
    share.setAttribute("data-testid", "button-copy-result");
    share.textContent = "என் முடிவை நகலெடு";
    share.addEventListener("click", () => copyResult(ending, m));
    actions.appendChild(share);

    choicesEl.appendChild(actions);
    card.classList.add("ending");
  }

  function copyResult(ending, m) {
    const text =
      `முத்தும் பாடலும் — ${ending.title}\n` +
      `${ending.banner}\n\n` +
      `நற்பெயர் ${m.reputation}/10 · முத்துகள் ${m.pearls}/10 · ` +
      `தெம்பு ${m.stamina}/10 · அறிவு ${m.wisdom}/10`;
    try {
      navigator.clipboard.writeText(text);
      const btn = document.querySelector('[data-testid="button-copy-result"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = "நகலெடுக்கப்பட்டது";
        setTimeout(() => (btn.textContent = orig), 1400);
      }
    } catch (e) {
      // no-op
    }
  }

  function restart() {
    state = initialState();
    document.querySelector(".scene-card").classList.remove("ending");
    renderScene(state.sceneId);
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("resetBtn").addEventListener("click", restart);
    renderScene(state.sceneId);
  });
})();
