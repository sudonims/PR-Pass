import json


class pr_pass(object):
    def __init__(self, num=None):
        self.sample = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                       "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                       "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", "$", "%", "^", "&", "*", '$', '?']
        self.def_lt = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        with open('cipher.json') as json_file:
            self.data = json.load(json_file)
        self.num = num

    def wrap(self, str):
        ans = []
        for i in range(0, len(str), 12):
            a = str[i:i+12]
            ans.append(a)
        return ans

    def add(self, a, b):
        if a == "":
            return b
        ans = ""
        if len(a) == len(b):
            for i in range(len(a)):
                ans += self.sample[(ord(a[i]) + ord(b[i])) % 72]
        else:
            for i in range(len(b)):
                ans += self.sample[(ord(a[i]) + ord(b[i])) % 72]
            ans += a[len(b):len(a)]
        return ans

    def gen_pass(self, password, num=None):
        if num == None:
            if self.num != None:
                luck = self.num
            else:
                return "Check docs again"
        else:
            luck = num

        luck1 = str(luck % 5)
        ans = ""
        for i in range(len(password)):
            a = password[i]
            if a in self.def_lt:
                ans += self.data[luck1][a]
            else:
                ans += a

        ans = self.wrap(ans)
        luck += 100
        luck %= 72
        ans1 = self.sample[luck]
        for i in range(1, 12):
            ans1 += (self.sample[ord(ans1[i-1]) % 72])

        for i in range(0, len(ans)):
            ans1 = self.add(ans1, ans[i])

        luck += len(password) + (len(ans) * len(password))
        luck %= 72
        char1 = self.sample[(luck % 26) + 26] + \
            self.sample[((luck + 111) % 10) + 62]
        char3 = self.sample[((luck + 222) % 10) + 62] + \
            self.sample[(luck + 300) % 26]
        # // console.log(char1, char3);

        luck = (len(password) * luck) % len(ans1)

        ans1 = ans1[0:luck] + char1 + ans1[luck:len(ans1)]

        luck += (len(password) + len(ans))
        luck %= len(ans1)

        ans1 = ans1[0:luck] + char3 + ans1[luck:len(ans1)]
        return ans1


def test():
    generator = pr_pass()
    a = generator.gen_pass("Nimisah", 12)
    generator_ = pr_pass(12)
    b = generator_.gen_pass("Nimish")
    print(a, b)


test()
