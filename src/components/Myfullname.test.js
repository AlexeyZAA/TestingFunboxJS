
import Myfullname from "./Myfullname"

const footer = Myfullname({'firstName': 'Алексей', 'lastName': 'Зубенко'})

it("Тест футера", () => {
    expect(footer).toMatchSnapshot()
});
