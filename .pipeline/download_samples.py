import urllib.request
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

urls = {
    'style.css': 'https://tabiturient.ru/css/style.css?v-1-193',
    'rating.html': 'https://tabiturient.ru/rating',
    'calculator.html': 'https://tabiturient.ru/calculator',
    'slivlist.html': 'https://tabiturient.ru/slivlist',
    'sravni.html': 'https://tabiturient.ru/sravni',
    'vuzcost.html': 'https://tabiturient.ru/vuzcost',
    'vuzege.html': 'https://tabiturient.ru/vuzege',
    'globalrating.html': 'https://tabiturient.ru/globalrating',
    'dod.html': 'https://tabiturient.ru/dod',
    'np.html': 'https://tabiturient.ru/np',
    'article.html': 'https://tabiturient.ru/article',
    'question.html': 'https://tabiturient.ru/question',
}

os.makedirs('.pipeline/source_samples', exist_ok=True)

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            filepath = os.path.join('.pipeline/source_samples', name)
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f"Downloaded {name} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error downloading {name}: {e}")
