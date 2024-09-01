<template>
    <div class="wrapper">
        <v-sheet rounded elevation="3">
            <v-card class="mx-auto px-10 py-10 w-full">
                <img src="@/assets/greenCheck.png" alt="Green Check" class="check-img mb-5" />
                <div class="descrizione">
                    <v-card-text class="desc text-h5 font-semibold text-blue-700 mb-3">Registrazione avvenuta con successo!</v-card-text>
                    <v-card-text class="desc text-h6 mb-3">Ora puoi accedere e salvare le statistiche delle partite:</v-card-text>
                </div>
                <v-btn class="button" :to="{ path: 'Login' }" color="primary" size="x-large" block elevation="5">
                    Accedi
                </v-btn>
            </v-card>
        </v-sheet>
    </div>
</template>

<style scoped>
.wrapper {
    padding: 16px;
    background: linear-gradient(205deg, rgba(58, 140, 255, 0.356), rgb(0, 110, 255));
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 96vh;
}

.v-sheet {
    max-width: 600px; 
    width: 100%;
}
.check-img {
    display: block;
    margin: 0 auto;
    width: 60%;
    max-width: 120px;
    height: auto;
}

.descrizione {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.desc {
    padding: 8px;
    text-align: center;
    display: block;
}

.button {
    width: 100%;
    border-radius: 8px;
    background-image: linear-gradient(to right, hsl(228, 100%, 50%), hsl(188, 100%, 59%));
    border: none;
    color: white;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 18px;
    margin-top: 20px;
    cursor: pointer;
    transition: background-image 0.4s ease, transform 0.4s ease;
}

.button:hover {
    background-image: linear-gradient(to left, rgb(0, 55, 255), rgb(0, 157, 255));
    color: rgb(255, 255, 255);
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    transform: translateY(-4px);
}

.button:active {
    transform: translateY(-2px);
}

@media (max-width: 600px) {
    .wrapper {
        padding: 8px;
    }

    .check-img {
        width: 80%;
        max-width: 80px;
    }

    .button {
        font-size: 16px;
        padding: 12px;
    }

    .desc {
        padding: 8px;
    }
}
</style>
