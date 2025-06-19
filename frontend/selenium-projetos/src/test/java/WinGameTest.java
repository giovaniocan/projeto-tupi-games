import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class WinGameTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    void testWinGameByFindingAllPairs() throws InterruptedException {
        driver.get("http://localhost:3000/");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Jogar')]"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Fácil (4X4)')]"))).click();
        wait.until(ExpectedConditions.urlContains("/jogo/F%C3%A1cil"));
        WebElement gameBoard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("game-board")));
        Thread.sleep(1000);

        List<WebElement> cardElements = gameBoard.findElements(By.className("carta-jogo"));
        Map<String, List<WebElement>> imageToCardsMap = new HashMap<>();
        for (WebElement card : cardElements) {
            WebElement image = card.findElement(By.tagName("img"));
            String imageUrl = image.getAttribute("src");
            imageToCardsMap.computeIfAbsent(imageUrl, k -> new ArrayList<>()).add(card);
        }

        for (List<WebElement> pair : imageToCardsMap.values()) {
            if (pair.size() == 2) {
                WebElement card1 = pair.get(0);
                WebElement card2 = pair.get(1);

                WebElement scoreElement = driver.findElement(By.className("pontuacao"));
                String scoreBefore = scoreElement.getText();

                System.out.println("Clicando no par com a imagem: " + card1.findElement(By.tagName("img")).getAttribute("src"));

                card1.click();
                card2.click();

                wait.until(ExpectedConditions.not(
                        ExpectedConditions.textToBePresentInElement(scoreElement, scoreBefore)
                ));
                System.out.println("Pontuação atualizada! Par confirmado.");
            }
        }

        System.out.println("Todas as cartas foram viradas!");

        WebElement scoreModal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("modal-overlay")));
        assertTrue(scoreModal.isDisplayed(), "O modal de pontuação não apareceu após o fim do jogo.");

        WebElement modalTitle = scoreModal.findElement(By.tagName("h1"));
        assertTrue(modalTitle.getText().equalsIgnoreCase("Parabéns!!"), "O título do modal não é 'Parabéns!'.");

        System.out.println(">>> SUCESSO! Jogo finalizado e modal de score verificado! <<<");
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// Esse teste verifica se o jogo é vencido corretamente ao encontrar todos os pares de cartas, clicando em cada par e verificando se o modal de pontuação aparece no final.
//mvn test -Dtest=WinGameTest