export const thousandSeperate = (data = "") => {
  return data
    .toString()
    .replace(/\s/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const roundPrice = (price, duration) => {
  return Math.ceil(price / duration / 1000) * 1000;
};

export const isActive = ({ store, localStore, product }) => {
  if (store) {
    return store.items.some((item) => item.id === product.id) ? 1 : 0;
  } else if (localStore) {
    return localStore.items.some((item) => item.id === product.id) ? 1 : 0;
  } else {
    return 0;
  }
};

export const removeQueryParam = ({ param, router }) => {
  const { pathname, query } = router;
  const params = new URLSearchParams(query);
  params.delete(param);
  router.replace({ pathname, query: params.toString() }, undefined, {
    shallow: true,
  });
};

export const addQueryParam = ({ key, value, router }) => {
  const { pathname, query } = router;
  const params = new URLSearchParams(query);
  params.append(key, value);
  router.replace({ pathname, query: params.toString() }, undefined, {
    shallow: true,
  });
};

export const updateQueryParam = ({ key, value, router }) => {
  const { query } = router;
  router.push({ query: { ...query, [key]: value } }, undefined, {
    shallow: true,
  });
};

export function unmaskPhone(value) {
  return value.replace(/\D/g, "");
}

export const maskPhoneNumber = (phone) => {
  if (!phone || phone.length < 4) return "";
  return `***-${phone.slice(-4, -2)}-${phone.slice(-2)}`;
};

export const formatDate = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid Date";

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${year}-${month}-${day}`;
};

export const formatDateForCard = (dateString) => {
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} | ${year}`;
};

export function extractTime(datetimeStr) {
  const date = new Date(datetimeStr);

  if (isNaN(date)) {
    return "Invalid date";
  }

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function groupMessagesByDate(messages) {
  const grouped = messages.reduce((acc, msg) => {
    const dateKey = formatDate(msg.created_at); // masalan: "26.02.2023"
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});

  // Har bir guruhni ichida sort qilamiz: eski > yangi
  for (const key in grouped) {
    grouped[key].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }

  // object ni tartiblangan array ko'rinishiga o'tkazamiz
  const sortedEntries = Object.entries(grouped).sort((a, b) => {
    const dateA = new Date(a[1][0].created_at);
    const dateB = new Date(b[1][0].created_at);
    return dateA - dateB; // eski sanalar birinchi
  });

  // qaytib object holiga o'tkazamiz
  const sortedGrouped = {};
  for (const [key, value] of sortedEntries) {
    sortedGrouped[key] = value;
  }

  return sortedGrouped;
}

export function formatDateForPayment(date) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year}  ${hours}:${minutes}`;
}

export function send_amount(amount) {
  if (!amount) return "0";
  return (parseFloat(amount.toString().replace(/\s/g, "")) * 100).toFixed(0);
}
