<template>
    <div class="wrapper">
        <v-sheet rounded elevation="3">
            <v-card class="mx-auto px-10 py-10 w-full">
                <img src="@/assets/greenCheck.png" alt="Green Check" class="check-img mb-5" />
                <div class="descrizione">
                    <v-card-text class="desc text-h5 font-semibold text-blue-700 mb-3">La mail per il reset della
                        password è stata inviata!</v-card-text>
                    <v-card-text class="desc text-h6 mb-3">Controlla la casella di posta.</v-card-text>
                </div>
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


@media (max-width: 600px) {
    .wrapper {
        padding: 8px;
    }

    .check-img {
        width: 80%;
        max-width: 80px;
    }

    .desc {
        padding: 8px;
    }
}
</style>
