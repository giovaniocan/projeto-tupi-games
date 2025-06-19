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

import static org.junit.jupiter.api.Assertions.assertTrue;

public class StartGameTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    void testStartEasyGameAndVerifyBoard() {
        driver.get("http://localhost:3000/");

        WebElement jogarButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Jogar')]")));
        jogarButton.click();

        WebElement facilButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Fácil (4X4)')]")));
        facilButton.click();

        boolean urlContainsJogoFacil = wait.until(ExpectedConditions.urlContains("/jogo/F%C3%A1cil"));
        assertTrue(urlContainsJogoFacil, "A URL não mudou para a página do jogo no modo fácil.");

        WebElement gameBoard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("game-board")));
        assertTrue(gameBoard.isDisplayed(), "O tabuleiro do jogo não está visível na tela.");

        System.out.println(">>> Teste executado com SUCESSO! <<<");
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

//esse teste verifica se o jogo inicia corretamente no modo fácil, clicando nos botões apropriados e verificando a URL e a visibilidade do tabuleiro do jogo.
// mvn test -Dtest=StartGameTest