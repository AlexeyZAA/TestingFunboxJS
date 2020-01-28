
import Myfullname from "./Myfullname"

const footer = Myfullname({'firstName': 'Алексей', 'lastName': 'Зубенко'})
//передаем функциональнльному компоненту данные и смотрим в снимке что получаем
it("Тест футера", () => {
    expect(footer).toMatchSnapshot()
});
