from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

YOUR_CV = """
İsmail Ozan Belkeci
---------
• Doğum yılı: 1999-05-18
• Eğitim:
    - Bilgisayar Programcılığı (İngilizce) – İstanbul Aydın Üniversitesi (2018–2022)
    - Bilişim Teknolojileri – Zehra Mustafa Dalgıç MTAL (2013–2017)
• İş Deneyimi:
   - Software Developer – GGSoft / PaperWork (2022 – Günümüz)
        - BPM (Business Process Management) platformunda MVC katmanında yeni özellikler geliştirdim ve mevcut modülleri iyileştirdim.
        - C# ve JavaScript teknolojilerini kullanarak low-code platform üzerinde özelleştirilmiş iş süreçleri geliştirdim.
        - JavaScript, HTML, CSS, Bootstrap ve Kendo UI kullanarak responsive ve kullanıcı dostu arayüzler tasarladım.
        - RESTful API ve SOAP servisler ile entegrasyon yaparak sistemler arası veri akışını sağladım.
   - Software Development Specialist – Intellity AI Solutions (2020 – 2022)
        - .NET tabanlı çeşitli projelerin geliştirilmesi ve yönetilmesinde aktif rol aldım.
        - E-ticaret platformları, araç takip sistemleri, QR kodlu ürün gösterimi ve profesyonel proje yönetimi çözümleri geliştirdim.
        - RESTful API ve SOAP servislerle sistemler arası entegrasyonlar gerçekleştirdim.
        - HTML, CSS, Bootstrap, JavaScript gibi teknolojilerle interaktif kullanıcı arayüzleri tasarladım ve geliştirdim.
   - İdari Asistan – Balaban Tekstil Ürünleri San. ve Tic. Ltd. Şti. (2019 – 2020)
        - Üretim süreçlerinde stok takibi, etiket envanteri yönetimi ve üretim süreçlerinin başlatılmasına katkı sağladım.
        - HTML ve CSS kullanarak küçük ölçekli stok takip arayüzleri tasarladım.
   - Stajyer – Mercedes-Benz Türk A.Ş. (2016 – 2017)
        - Ürün arayüzü üzerinden veya doğrudan MSSQL üzerinden veri girişleri ve güncellemeleri gerçekleştirdim.
        - Kurumsal üretim süreçlerinde kullanılan sistemler hakkında deneyim kazandım.
• Yetenekler: 
    - Programlama Dilleri: C#, SQL, JavaScript
    - Web Geliştirme: ASP.NET MVC, ASP.NET Core, ASP.NET Web API
    - Teknolojiler: .NET Framework, .NET Core, Entity Framework, Dapper, RabbitMQ, Docker
    - Veritabanları: MS SQL Server, PostgreSQL, MongoDB
    - Mimari & Metodolojiler: RESTful API, SOAP Services, Domain Driven Design (DDD), Microservices, CQRS, Design Patterns
    - Diğer: JWT, IdentityServer4, Agile Development & Scrum
• İletişim:
    - Telefon: +90 501 587 10 37
    - E-posta: belkeci.ozan@gmail.com
    - LinkedIn: linkedin.com/in/belkeciozan
    - GitHub: github.com/ozanbelkeci
• Referanslar:
    - Çağın Arslan - Intellity AI Kurucu +90 533 158 97 00
    - Armağan Saygılı - Takım Lideri +90 553 561 86 92
    - Muhammet Berçin - Takım Lideri +90 538 711 64 94
• Askerlik Durumu: Yapıldı.   
• Hobiler:
    - Müzik, vokallik, gitar çalmak
    - Kickboks
    - Video oyunları
"""

class LLMService:
    def __init__(self):
        print("💡 LOADED API KEY:", repr(os.getenv("OPENAI_API_KEY")))
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4.1-mini"

    def chat(self, message: str) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Sen bir CV tanıtım botusun. Ama İsmail Ozan Belkeci'nin ağzından konuşmanı istiyorum. "
                        """
                        Aşağıdaki özel yeteneği kullan:

                        1) **Personal Branding (Satış Cümleleri):**
                        - Ozan’ın güçlü yönlerini etkili, özgüvenli ve profesyonel şekilde vurgula.
                        - Gerektiğinde bunları doğal akışta kullan.

                        Örnek cümleler:
                        - "Yeni teknolojilere adapte olma hızı gerçekten yüksektir."
                        - "Takım içi iletişimi güçlendirebilen bir karaktere sahiptir."
                        """
                        "Kullanıcı ne sorarsa sorsun yalnızca aşağıdaki özgeçmişte yer alan bilgileri kullanarak cevap ver. "
                        "Özgeçmişte olmayan hiçbir bilgiyi uydurma, tahmin etme veya genişletme.\n\n"
                        "İŞTE ÖZGEÇMİŞ:\n"
                        + YOUR_CV
                    )
                },
                {"role": "user", "content": message}
            ]
        )
        
        return response.choices[0].message.content
