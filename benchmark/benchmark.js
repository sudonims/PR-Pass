var zxcvbn = require('zxcvbn');
var nodeplotlib = require('nodeplotlib');
var plot = nodeplotlib.plot;

var passwordData = ["~!@", "~!@#$%", "__--_-__-_", "-", "!", "!@", "!@#", "!@#$", "!@#$%", "!@#$%^", "!@#$%^&", "!@#$%^&*", "!@#$%^&*(", "!@#$%^&*()", "/.,", ".", ")", ")(", ")(*", ")(*&", ")(*&^", ")(*&^%", ")(*&^%$", ")(*&^%$#", ")(*&^%$#@", ")(*&^%$#@!", "@#$%^&", "*", "\b", "0", "000", "0000", "00000", "000000", "0000000", "00000000", "0007", "007", "007007", "010101", "010203", "0123", "0123456", "0213", "0246", "0249", "0252324665", "061892", "0727", "0727527122", "09", "098", "0987", "09876", "098765", "0987654", "09876543", "098765432", "0987654321", "0ffl1ne", "0nl1ne", "0o9i8u7y", "0ok9ij", "0okm9ijn", "0p3r4t0r", "0p9o8i7u6y5t4r3e2w1q", "0plmnko9", "0r@cl3", "1", "100200", "102030", "1020304050", "1022", "1029", "10293", "102938", "1029384756", "106", "10sne1", "11", "110110", "110110jp", "111", "1111", "11111", "111111", "1111111", "11111111", "112233", "11223344", "12", "1209", "120gd43ac458", "1212", "121212", "12121212", "1213", "1214", "1217", "1225", "123", "`123", "123000", "123098", "123123", "123@123", "123123123", "12321", "123234", "123321", "1234", "12341234", "12345", "123456", "123456!", "1234567", "12345678", "123456789", "1234567890", "12345678910", "12345679", "1234567a", "123456a", "123456aa", "123456abc", "123456q", "12345qwert", "1234abc", "1234abcd", "1234qwer", "1234qwerty", "123654", "123654789", "123789", "123abc", "123.abc", "123@abc", "123admin", "123.com", "123go", "123hfjdk147", "123qwe", "123qwe!@#", "123qweasd", "123qweasdzxc", "123root", "123root123", "123www", "12qwaszx", "1313", "131313", "1314520", "1316", "1332", "13579", "1412", "1430", "14430", "145236", "147147", "159357", "159753", "1701d", "171717", "1812overture", "1818", "181818", "18atcskd2w", "1900", "1901", "1902", "1903", "1904", "1905", "1906", "1907", "1908", "1909", "1910", "1911", "1912", "1913", "1914", "1915", "1916", "1917", "1918", "1919", "1920", "1921", "1922", "1923", "1924", "1925", "1926", "1927", "1928", "1929", "1930", "1931", "1932", "1933", "1934", "1935", "1936", "1937", "1938", "1939", "1940", "1941", "1942", "1943", "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "1a2b3c", "1a2b3c4d", "1a2s3d4f", "1chris", "1kitty", "1l0v3y0u", "1p2o3i", "1q2w3e", "1q2w3e4r", "1q2w3e4r5t", "1q2w3e4r5t6y", "1q2w3e4r5t6y7u8i9o0p", "1qa2ws", "1qa2ws3ed", "1qaz", "1qaz2wsx", "1qaz2wsx3edc", "1qaz2wsx3edc4rfv", "1qaz#edc5tgb", "1qaz!qaz", "1qaz@wsx", "1qaz@wsx3edc$rfv", "1qazxsw@", "1qazxsw2", "1qw23e", "1qw23er4", "1qwe23", "1sanjose", "1thread2bill", "1z2x3c4v", "20", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "21", "2112", "21122112", "22", "2200", "222", "2222", "22222", "222222", "2222222", "22222222", "2252", "225588", "232323", "24021988", "2bornot2b", "2h7vkzo266", "2kids", "2welcome", "2wsx", "2wsx3edc", "3", "3010", "3112", "31337", "31338", "3141", "3.1415", "31415926", "321", "321321", "321root", "321root321", "333", "3333", "33333", "333333", "3333333", "33333333", "3533", "369", "3bears", "3edc", "3edc4rfv5tgb", "3rjs1la7qe", "3@rth", "4", "4055", "4077mash", "42bsd", "4.2bsd", "4321", "43bsd", "4.3bsd", "444", "4444", "44444", "4444444", "44444444", "4788", "4854", "4dm1n", "4dm1n1str4t0r", "4na2xf", "4rfv", "4rfv$rfv", "4runner", "5", "5050", "5121", "520520", "521521", "5252", "54321", "555", "5555", "55555", "555555", "5555555", "55555555", "5683", "57chevy", "5amantha", "5and5", "5h3i5lik3p4rty@v3r", "5tgb", "5tgb6yhn", "5tgb6yhn#p", "6262", "6301", "654321", "666", "6666", "66666", "666666", "6666666", "66666666", "666s1czfarginn", "68jjj167@102", "6969", "696969", "69zulu4z", "6v21wbgad", "6yhn", "!7350r13r0", "741852", "753951", "7654321", "777", "7777", "77777", "777777", "7777777", "77777777", "789456", "789789", "7dwarfs", "7ujm", "7yhn", "80486", "852963", "8675309", "87654321", "888", "8888", "88888", "888888", "8888888", "88888888", "8ik,", "90210", "911", "911sc", "911scturbo", "911turbo", "92072", "963963", "987654", "987654321", "999", "9999", "99999", "999999", "9999999", "99999999", "a", "a111111", "a123123", "a12345", "a123456", "a123456789", "a159456", "a1b2c3", "a1b2c3d4", "a1s2d3", "a4576a", "aa", "aa123456", "aaa", "aaa123", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aardvark", "aaron", "aaron1", "aaron123", "aaronaaron", "aaronpass", "aarti", "ab1cd2ef3", "abacab", "abadabdoo", "abbot", "abbott", "abby", "abc", "abc123", "abc@123", "abc1234", "abc12345", "abc123456", "abcd", "abcd123", "abcd1234", "abcde", "abcdef", "abcdefg", "abcdefgh", "abcdefghi", "abdenace", "abdol", "abdul", "abdulkaf", "abdullah", "abdur", "abe", "abe123", "abel", "abel123", "abgrtyu", "abhijit", "abhiram", "abigail", "abigail123", "about", "abracadabra", "abracadaver", "abraham", "abraham123", "abrar", "absolut", "abuse", "abuse1", "abuse123", "abuseabuse", "abusepass", "acacia", "academia", "academic", "accept", "access", "accord", "account", "account123", "accounts", "accounts1", "accounts123", "accountsaccounts", "accountspass", "ace", "ace123", "acknak", "acropolis", "action", "actionman", "active", "actor", "acura", "ad4hosting", "ada", "ada123", "adabas", "adam", "adam1", "adam123", "adamadam", "adampass", "adams", "adel", "adela", "adela123", "adeline", "adeline123", "adg", "adgjmptw", "adi", "adib", "adidas", "adine", "adm", "adm123", "adm1234", "admin", "admin!@", "admin01", "admin1", "admin1111", "admin123", "admin@123", "admin1234", "admin12345", "admin123456", "adminadmin", "administ", "administrator", "administrator1", "administrator123", "adminlinux", "adminpass", "adminpassword", "adminroot", "admissions", "admissions1", "admissions123", "admissionsadmissions", "admissionspass", "adnan", "adobe1", "adobe123", "adobeadobe", "adolf", "adolf123", "adolph", "adolph123", "adrian", "adrian123", "adriana", "adriana123", "adrianna", "adrianne", "adrien", "adrienne", "adrock", "ads", "ads1", "ads123", "adsads", "adspass", "adult", "adventur", "advertise", "advertise1", "advertise123", "advertiseadvertise", "advertisepass", "advertising", "advertising1", "advertising123", "advertisingpass", "advil", "aeh", "aeneas", "aerobics", "affiliate", "affiliate1", "affiliate123", "affiliateaffiliate", "affiliatepass", "affiliates", "affiliates1", "affiliates123", "affiliatesaffiliates", "affiliatespass", "afresh", "africa", "africa123", "afrid", "after", "again", "agent", "aggie", "aggies", "agnes", "agnes123", "ahidee", "ahmed", "ahmet", "aikman", "aileen", "aimee", "airborne", "aircraft", "airhead", "airplane", "airwolf", "ajai", "ajay", "akhil", "aki123", "akiko", "al", "al123", "alain", "alamgir", "alan", "alan1", "alan123", "alanalan", "alanpass", "alas", "alaska", "alastair", "alayne", "albany", "albatros", "albatross", "albert", "albert123", "albertha", "albertha123", "alberto", "album", "alcapone", "alec", "alec123", "alejandr", "alena", "alert", "alessand", "alex", "alex1", "alex123", "alexalex", "alexande", "alexander", "alexander123", "alexandr", "alexandra", "alexandra123"]

var benchmarkOriginal = passwordData.map((pass) => {
    return zxcvbn(pass).score;
});

var x = benchmarkOriginal.map((val, i) => {
    return i;
});

plot([{ x: x, y: benchmarkOriginal, type: "line" }]);



var sample = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "%", "^", "&", "*", '$', '?'];

var def_lt = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var data = require('../cipher.json');

const wrap = (string) => {
    ans = [];
    for (let i = 0; i < string.length; i += 12) {
        a = string.slice(i, i + 12);
        ans.push(a);
    }
    return ans;
}

function add(a, b) {
    a = a.toString();
    b = b.toString();

    if (a == "" || typeof a == undefined) {
        return b;
    }
    ans = "";
    if (a.length == b.length) {
        for (let i = 0; i < a.length; i++) {
            ans += sample[(a[i].charCodeAt(0) + b[i].charCodeAt(0)) % 72];
        }
    } else {
        for (let i = 0; i < b.length; i++) {
            ans += sample[(a[i].charCodeAt(0) + b[i].charCodeAt(0)) % 72];
        }
        ans += a.slice(b.length, a.length);
    }
    return ans.toString();
}

const generatedPass = passwordData.map( (pass, i) => {
    var luck = i;
    luck1 = luck % 5;
    luck1 = `${luck1}`;
    // console.log(luck1, typeof luck1);
    var ans = ""
    for (let i = 0; i < pass.length; i++) {
        a = pass[i]
        if (def_lt.includes(a)) {
            ans += data[luck1][a];
        } else {
            ans += a;
        }
    }
    ans =  wrap(ans);
    // console.log('ans', ans);
    luck += 100;
    luck %= 72;
    ans1 = sample[luck].toString();
    ans1 = ans1.repeat(12);
    // console.log('initial', ans1);
    // ans1.replace(ans1[0],)

    for (let i = 0; i < ans.length; i++) {
        ans1 = add(ans1, ans[i]);
        // console.log('in loop',ans1);
    }
    // console.log(ans1);
    luck += pass.length + (ans.length * pass.length);
    luck %= 72;
    char1 = sample[(luck % 26) + 26] + sample[((luck + 111) % 10) + 62];
    char3 = sample[((luck + 222) % 10) + 62] + sample[(luck + 300) % 26];
    // console.log(char1, char3);


    luck = (pass.length * luck) % ans1.length;


    ans1 = ans1.slice(0, luck) + char1 + ans1.slice(luck, ans1.length);

    luck += (pass.length + ans.length)
    luck %= ans1.length;

    ans1 = ans1.slice(0, luck) + char3 + ans1.slice(luck, ans1.length);

    return ans1;
});

console.log(generatedPass[4]);

var benchmarkGenerated = generatedPass.map((pass)=>{
    return zxcvbn(pass).score;
});

// console.log(benchmarkGenerated);

plot([{x:x,y:benchmarkGenerated,type:"line"}]);