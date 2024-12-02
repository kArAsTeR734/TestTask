export async function getAuthToken() {
    const url = "https://hcateringback-dev.unitbeandev.com/api/auth/login";
    const credentials = {
        login: "admin",
        password: "admin"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(`Ошибка получения токена: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Не удалось получить токен:", error);
        return null;
    }
}

//Устанавливаем токен в локальное хранилище
const token = getAuthToken().then((token) => {
    console.log(token);
});