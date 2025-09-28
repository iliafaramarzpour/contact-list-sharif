# Contacts Dashboard

یک پروژه مدیریت مخاطبین که با **Next.js** و **Zustand** ساخته شده است. این پروژه اطلاعات مخاطبین شامل **نام، نام خانوادگی، آدرس، شماره تماس** را مدیریت می‌کند و داده‌ها در **Local Storage** ذخیره می‌شوند تا در طول زمان حفظ شوند.

## ویژگی‌ها
- مدیریت مخاطبین با قابلیت اضافه، ویرایش و حذف.
- ذخیره‌سازی اطلاعات مخاطبین در **Local Storage**.
- استفاده از **Zustand** برای مدیریت وضعیت و همزمان‌سازی با **Local Storage**.
- طراحی واکنش‌گرا و استفاده از **TailwindCSS** برای استایل‌ها.
- استفاده از [radix-ui](https://www.radix-ui.com/) برای tailwindcss react-component , ui-kit


## پیش‌نیازها
- **Node.js** (نسخه استیبل به بالا)
- **npm** (نسخه استیبل به بالا)

## نصب و راه‌اندازی

برای نصب و راه‌اندازی پروژه، مراحل زیر را دنبال کنید:

1. مخزن را کلون کنید:
   ```bash
   git clone https://github.com/iliafaramarzpour/contact-list-sharif.git


2. پکیج های npm را نصب کنید:
    ```bash
    npm install
3. پس از نصب کامل دستوری اجرای نرم افزار را وارد کنید:
    ```bash
    npm run dev
4. حالا میتوانید پروژ را در مرورگر خود مشاهده کنید:
    ```bash
    http://localhost:3000

# پیشنهادات

## توسعه نرم افزار
- در این نرم افزار که یک **design pattern** عمومی که به صورت **feature-base** هست استفاده شده. که قطعا از نوع نگاه به یک پروژه کوچک کاملا مناسب است ولی برای **scale** کردن یک بخش کوچک برای یک نرم افزار بزرگ قطعا تمامی ساختار مورد نیاز به صورت **library** نوشته شده و استفاده میشود که اکثرا در پروژه های **Micro Frontend** میباشد.


## پوشه بندی
- به صورت عامیانه کاملا برای یک نرم افزار سطح کوچک پوشه بندی فعلی کاملا نیاز ما را برطرف میکند ولی در آینده برای scale کردن یک پروژه باید از ساختار های **service base** یا **library base**.

- یکی از مثال ها که در این نرم افزار انجام شده استفاده از پوشه components -> ui -> (ui components) که وقتی از کتابخانه UI استفاده میکنیم برای جداسازی **Style Guide** یا **Design System** , **Ui Kit** انجام میدهیم.

## ساختار Design
- در ساختار زیرین نرم افزار در واحد **CSS** از قوانین ظاهری که بعضا از خودمان یا **UI KIT** انجام میشود که منطقا مورد نیاز است مخصوصا در بخش پروژه های سایز بزرگ که نیازمند **Design Token**, **Style Guide** هستن این موارد باید انجام شود که یکپارچگی UI در بین کامپوننت های نرم افزار یا خیلی بزرگ تر در بین چندین نرم افزار در ساختار **Micro Frontend** میباشد.

## نگهداری ستون Design
- قطعا در بحث نگهداری کامپوننت های **re-useable** همانند کامپوننت های استفاده شده از **radix-ui** نیاز مند نوشتن **Document** برای مطمئن شدن از توسعه ظاهری درست نرم افزار میباشد.



## توسعه پایدار

- در نرم افزار فعلی هر چه سعی بر آن شده است که استفاده **Contact List Service** تقریبا بدون وابستگی به یک پروژه بتواند در محیط های وب در همین استک به راحتی کار کند که از **Zustand** و **Zustand Presist Middleware** استفاده شده و یک سرویس کامل  **CRUD** مخاطبین توسعه داده شده.

در ساختار ذیل میتوانید عملیات گسترده **Contact CRUD** را مشاهده کنید.

```bash
import { useContactsStore } from './store/contactsStore';


    // Add Contact

    useContactsStore.getState().addContact({
        firstName: "Ilia",
        lastName: "Fm",
        phone: "09111111111",
        address: "Amol County",
    });

    // Update Contact with `id`

    useContactsStore.getState().updateContact('1', {
        phone: "09112222222",
        address: "Mazandaran",
    });

    // Delete Contact with `id`

    useContactsStore.getState().deleteContact('1');

    // Set search key like: name , family , address , phone number

    useContactsStore.getState().setSearchFilter('name');

    // Search with a value like from a key: name => ilia , family => fm

    useContactsStore.getState().setSearchTerm('Ilia');

    // Get a filtered data after set search key , value

    useContactsStore.getState().getFilteredContacts();


    // Set Loading for simulate ro real loading from server

    useContactsStore.getState().setLoading(boolean);


    // For local storage and retrieval in software use, especially when received from the server. For hydration until the current data is loaded and then updated when received from the server.

    persist(
    (set, get) => ({
            contacts: [],
            // methods ....
        }),
        {
            name: 'contacts-storage', // local storage key
            partialize: (state) => ({
                contacts: state.contacts
            })
        }
    );
```

# پایان
- با استفاده از این متدها، شما می‌توانید به راحتی وضعیت مخاطبین را مدیریت کنید، آن‌ها را جستجو کنید، و فیلترهای مختلفی برای نمایش اطلاعات در نظر بگیرید. این امکانات به شما امکان می‌دهد تا برنامه خود را به شکل پویا و با استفاده از Zustand بهینه‌سازی کنید.
