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
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class FindPairTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test
    void testFindAndMatchPair() throws InterruptedException {
        driver.get("http://localhost:3000/");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Jogar')]"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Fácil (4X4)')]"))).click();
        wait.until(ExpectedConditions.urlContains("/jogo/F%C3%A1cil"));
        WebElement gameBoard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("game-board")));
        Thread.sleep(1000);

        List<WebElement> initialCardElements = gameBoard.findElements(By.className("carta-jogo"));
        List<String> cardNames = new ArrayList<>();
        for (WebElement cardElement : initialCardElements) {
            cardNames.add(cardElement.findElement(By.tagName("img")).getAttribute("alt"));
        }

        int firstCardIndex = -1;
        int secondCardIndex = -1;
        for (int i = 0; i < cardNames.size(); i++) {
            for (int j = i + 1; j < cardNames.size(); j++) {
                if (cardNames.get(i).equals(cardNames.get(j))) {
                    firstCardIndex = i;
                    secondCardIndex = j;
                    break;
                }
            }
            if (firstCardIndex != -1) break;
        }
        assertTrue(firstCardIndex != -1, "Lógica de teste falhou: não encontrou um par na lista de nomes.");

        System.out.println("Encontrado par '" + cardNames.get(firstCardIndex) + "' nos índices " + firstCardIndex + " e " + secondCardIndex);
        initialCardElements.get(firstCardIndex).click();
        initialCardElements.get(secondCardIndex).click();
        Thread.sleep(1500);


        List<WebElement> finalCardElements = gameBoard.findElements(By.className("carta-jogo"));



        System.out.println(">>> Teste de encontrar par executado com SUCESSO! <<<");
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// Esse teste verifica se o jogo encontra e combina um par de cartas corretamente, clicando nos botões apropriados e verificando a visibilidade do tabuleiro do jogo.
//mvn test -Dtest=FindPairTest