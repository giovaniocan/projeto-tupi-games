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


public class GameNavigationTest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }

    @Test
    void testNavigateToDifficultyScreen() {

        driver.get("http://localhost:3000/");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));


        WebElement jogarButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Jogar')]")));
        jogarButton.click();


        WebElement facilButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[contains(text(), 'Fácil (4X4')')]")));

        assertTrue(facilButton.isDisplayed(), "A navegação para a tela de dificuldade falhou.");
        System.out.println("Teste de navegação executado com sucesso!");
    }

    @AfterEach
    void tearDown() {

        if (driver != null) {
            driver.quit();
        }
    }
}

//mvn test -Dtest=GameNavigationTest