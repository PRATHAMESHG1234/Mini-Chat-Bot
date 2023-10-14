import WordTypingAnimation from "./WordTypingAnimation";

const responseFormats = (
  response,
  showEnglishTranslation,
  toggleTranslation
) => {
  const {
    Chapter,
    Verse,
    SanskritAnuvadForHindi,
    SanskritAnuvad,
    HindiAnuvad,
    EnglishTranslation,
    Answer,
    Title,
  } = response;

  return [
    {
      text: (
        <div
          className={`bot-response format-1 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            <strong> {Chapter}:</strong> Explore the depths of this chapter
            titled "<strong>{Title}</strong>" which contains{" "}
            <strong> {Verse}</strong>.
          </p>
          <p>
            <strong>Experience its essence in Sanskrit: </strong>
            <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <p>
            <strong>Feel the emotions in English: </strong>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-2 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            <strong> {Chapter}:</strong>{" "}
            <em>
              "<strong>{Title}</strong>"
            </em>{" "}
            contains <strong> {Verse}</strong>.
          </p>
          <p>
            <strong>Snaskrit Anuvad: </strong> <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>English Translation:</strong>{" "}
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-3 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            Discover the essence of <strong> {Verse}</strong> from the{" "}
            <strong> {Chapter}:</strong> titled "
            <em>
              "<strong>{Title}</strong>"
            </em>
            ".
          </p>
          <p>
            <strong>Explore its Sanskrit version: </strong>
            <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>Delve into its English interpretation: </strong>
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-4 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            <strong> {Chapter}:</strong> Explore{" "}
            <em>
              "<strong>{Title}</strong>"
            </em>{" "}
            with <strong> {Verse}</strong>.
          </p>
          <p>
            <strong>Snaskrit Anuvad: </strong> <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>English Translation:</strong>{" "}
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-5 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            Journey through <strong> {Verse}</strong> in the{" "}
            <strong> {Chapter}:</strong> titled "
            <em>
              "<strong>{Title}</strong>"
            </em>
            ".
          </p>
          <p>
            <strong>Experience its Sanskrit form: </strong>
            <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>Feel its essence in English: </strong>
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-6 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            Uncover the wisdom within <strong> {Verse}</strong> of the{" "}
            <strong> {Chapter}:</strong> titled "
            <em>
              "<strong>{Title}</strong>"
            </em>
            ".
          </p>
          <p>
            <strong>Discover its Sanskrit essence: </strong>
            <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>Feel its English interpretation: </strong>
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-7 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            <strong> {Chapter}:</strong>Experience{" "}
            <em>
              "<strong>{Title}</strong>"
            </em>{" "}
            through <strong> {Verse}</strong>.
          </p>
          <p>
            <strong>Snaskrit Anuvad: </strong> <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>English Translation:</strong>{" "}
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-8 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            Embark on a journey through <strong> {Verse}</strong> from the{" "}
            <strong> {Chapter}:</strong> titled "
            <em>
              "<strong>{Title}</strong>"
            </em>
            ".
          </p>
          <p>
            <strong>Feel its Sanskrit expression: </strong>
            <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong> Understand its English interpretation: </strong>
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
    {
      text: (
        <div
          className={`bot-response format-9 ${
            showEnglishTranslation ? "show-translation" : ""
          }`}
        >
          <p>
            Dive into the depths of <strong> {Chapter}:</strong>
            <em>
              "<strong>{Title}</strong>"
            </em>{" "}
            with <strong> {Verse}</strong>.
          </p>
          <p>
            <strong>Snaskrit Anuvad: </strong> <p>{`"${SanskritAnuvad}"`} </p>.
          </p>
          <strong>English Translation:</strong>{" "}
          <p>
            <WordTypingAnimation text={`"${EnglishTranslation}"`} speed={200} />
            .
          </p>
        </div>
      ),
    },
  ];
};

export default responseFormats;
