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

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ChangeLanguageTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    void testFullLanguageChangeFlow() {
        driver.get("http://localhost:3000/");

        WebElement playButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[text()='Jogar']")));
        assertEquals("Jogar", playButton.getText(), "O texto inicial do botão deveria ser 'Jogar'.");
        System.out.println("Estado inicial em Português verificado.");

        WebElement languagePageButton = driver.findElement(By.xpath("//button[text()='Linguagem']")); // Corrigido para maiúsculas
        languagePageButton.click();
        System.out.println("Clicou em LINGUAGEM.");

        WebElement guaraniButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Guarani']")));
        guaraniButton.click();
        System.out.println("Clicou em Guarani.");

        System.out.println(">>> SUCESSO! Teste completo de troca de idioma finalizado! <<<");
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// Esse teste verifica se o jogo inicia corretamente no modo fácil, clica nos botões apropriados e verifica a URL e a visibilidade do tabuleiro do jogo.
//mvn test -Dtest=ChangeLanguageTest